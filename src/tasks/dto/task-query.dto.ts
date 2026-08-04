import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class TaskQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Maximum number of tasks per page',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @ApiPropertyOptional({
    description: 'Filter tasks by completion status',
    example: false,
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  })
  @IsBoolean()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Search task titles case-insensitively',
    example: 'nestjs',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter tasks belonging to a project',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  projectId?: number;

  @ApiPropertyOptional({
    description: 'Field used for sorting',
    enum: ['id', 'title', 'createdAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['id', 'title', 'createdAt'])
  sortBy: 'id' | 'title' | 'createdAt' = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sorting direction',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}
