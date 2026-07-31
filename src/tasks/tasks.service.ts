import { Injectable } from '@nestjs/common';

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
  findAll() {
    return this.tasks;
  }
}
