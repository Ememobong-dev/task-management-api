import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@Controller('health')
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Check API health',
  })
  health() {
    return {
      status: 'ok',
      service: 'Task Management API',
      timestamp: new Date().toISOString(),
    };
  }
}
