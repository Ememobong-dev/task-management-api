import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { Prisma } from '../generated/prisma/client';
import { TaskQueryDto } from './dto/task-query.dto';
@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: TaskQueryDto) {
    const { page, limit, completed, search, sortBy, sortOrder } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.TaskWhereInput = {};

    if (completed !== undefined) {
      where.completed = completed;
    }

    if (search?.trim()) {
      where.title = {
        contains: search.trim(),
        mode: 'insensitive',
      };
    }

    let orderBy: Prisma.TaskOrderByWithRelationInput;

    switch (sortBy) {
      case 'id':
        orderBy = {
          id: sortOrder,
        };
        break;

      case 'title':
        orderBy = {
          title: sortOrder,
        };
        break;

      default:
        orderBy = {
          createdAt: sortOrder,
        };
    }

    const [tasks, total] = await this.prisma.$transaction([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),

      this.prisma.task.count({
        where,
      }),
    ]);

    return {
      data: tasks,

      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException(`Task wth ID ${id} was not found`);
    }
    return task;
  }

  async addTask(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title.trim(),
      },
    });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: {
        ...(updateTaskDto.title !== undefined && {
          title: updateTaskDto.title.trim(),
        }),

        ...(updateTaskDto.completed !== undefined && {
          completed: updateTaskDto.completed,
        }),
      },
    });
  }

  async removeTask(id: number) {
    await this.findOne(id);
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
