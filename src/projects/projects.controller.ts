import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { ProjectResponseDto } from './dto/project-response.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a project',
  })
  @ApiCreatedResponse({
    description: 'Project created successfully',
    type: ProjectResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid project data',
    type: ErrorResponseDto,
  })
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all projects',
  })
  @ApiOkResponse({
    description: 'Projects retrieved successfully',
    type: [ProjectResponseDto],
  })
  findAllProjects() {
    return this.projectsService.findAllProjects();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a project and its tasks',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Project retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project does not exist',
    type: ErrorResponseDto,
  })
  findProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findProjectById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete an empty project',
    description: 'A project cannot be deleted while tasks still belong to it.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiNoContentResponse({
    description: 'Project deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project does not exist',
    type: ErrorResponseDto,
  })
  @ApiConflictResponse({
    description: 'Project still contains tasks',
    type: ErrorResponseDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProject(@Param('id', ParseIntPipe) id: number) {
    await this.projectsService.removeProject(id);
  }
}
