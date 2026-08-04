import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { TaskQueryDto } from './dto/task-query.dto.js';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { TaskListResponseDto } from './dto/task-list-response.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @ApiOperation({
    summary: 'Get tasks',
    description:
      'Returns paginated tasks with optional filtering, searching, and sorting.',
  })
  @ApiOkResponse({
    description: 'Tasks retrieved successfully',
    type: TaskListResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    type: ErrorResponseDto,
  })
  findAll(@Query() query: TaskQueryDto) {
    return this.taskService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a task by ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Task ID',
  })
  @ApiOkResponse({
    description: 'Task retrieved successfully',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ID is not a valid integer',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Task does not exist',
    type: ErrorResponseDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a task',
  })
  @ApiCreatedResponse({
    description: 'Task created successfully',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid task data',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'The supplied project does not exist',
    type: ErrorResponseDto,
  })
  addTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.addTask(createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a task',
    description:
      'Partially updates the title, completion status, or project relationship.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Task updated successfully',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Task or destination project does not exist',
    type: ErrorResponseDto,
  })
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a task',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiNoContentResponse({
    description: 'Task deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Task does not exist',
    type: ErrorResponseDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTask(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.removeTask(id);
  }
}
