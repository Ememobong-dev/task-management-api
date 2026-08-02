import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  createProject(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: createProjectDto.name.trim(),
      },
    });
  }

  findAllProjects() {
    return this.prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findProjectById(id: number) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} was not found`);
    }

    return project;
  }

  async removeProject(id: number) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} was not found`);
    }

    if (project._count.tasks > 0) {
      throw new ConflictException(
        `Project cannot be deleted because it still has ${project._count.tasks} task(s)`,
      );
    }

    await this.prisma.project.delete({
      where: {
        id,
      },
    });
  }
}
