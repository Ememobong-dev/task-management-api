import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let tasksService: TasksService;

  const prismaMock = {
    task: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },

    project: {
      findUnique: jest.fn(),
    },

    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);

    jest.clearAllMocks();
  });

  describe('findTaskById', () => {
    it('should return a task when it exists', async () => {
      const task = {
        id: 1,
        title: 'Learn NestJS testing',
        completed: false,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.task.findUnique.mockResolvedValue(task);

      const result = await tasksService.findOne(1);

      expect(result).toEqual(task);

      expect(prismaMock.task.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });

    it('should throw NotFoundException when task does not exist', async () => {
      prismaMock.task.findUnique.mockResolvedValue(null);

      await expect(tasksService.findOne(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('should create a task for an existing project', async () => {
      const dto = {
        title: 'Learn automated testing',
        projectId: 1,
      };

      const project = {
        id: 1,
        name: 'Backend Learning',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdTask = {
        id: 10,
        title: 'Learn automated testing',
        completed: false,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        project,
      };

      prismaMock.project.findUnique.mockResolvedValue(project);
      prismaMock.task.create.mockResolvedValue(createdTask);

      const result = await tasksService.addTask(dto);

      expect(result).toEqual(createdTask);

      expect(prismaMock.project.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });

      expect(prismaMock.task.create).toHaveBeenCalledWith({
        data: {
          title: 'Learn automated testing',

          project: {
            connect: {
              id: 1,
            },
          },
        },

        include: {
          project: true,
        },
      });
    });

    it('should throw NotFoundException when project does not exist', async () => {
      prismaMock.project.findUnique.mockResolvedValue(null);

      await expect(
        tasksService.addTask({
          title: 'Learn Redis',
          projectId: 999,
        }),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.task.create).not.toHaveBeenCalled();
    });
  });
});
