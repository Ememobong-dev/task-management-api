import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApplicationInfo() {
    return {
      name: 'Task Management API',
      status: 'running',
      message: 'NestJs Project',
    };
  }
}
