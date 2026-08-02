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

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get()
  findAllProjects() {
    return this.projectsService.findAllProjects();
  }

  @Get(':id')
  findProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findProjectById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProject(@Param('id', ParseIntPipe) id: number) {
    await this.projectsService.removeProject(id);
  }
}
