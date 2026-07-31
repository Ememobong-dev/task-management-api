import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TasksService {
  private readonly tasks = [
    {
      id: 1,
      title: 'Learn NestJS fundamentals',
      completed: true,
    },
    {
      id: 2,
      title: 'Connect PostgreSQL',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn Prisma ORM',
      completed: false,
    },
  ];
  private nextId = 4;

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task wth ID ${id} was not found`);
    }
    return task;
  }

  addTask(createTaskDto: CreateTaskDto) {
    const task = {
      id: this.nextId++,
      title: createTaskDto.title.trim(),
      completed: false,
    };

    this.tasks.push(task);
    return task;
  }
}
