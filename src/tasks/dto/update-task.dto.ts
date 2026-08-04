import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'New task title',
    example: 'Master NestJS Swagger',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title?: string;

  @ApiPropertyOptional({
    description: 'Whether the task has been completed',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Move the task to another project',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  projectId?: number;
}
