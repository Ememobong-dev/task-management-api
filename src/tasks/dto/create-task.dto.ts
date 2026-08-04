import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Learn NestJS Swagger',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiProperty({
    description: 'ID of the project this task belongs to',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  projectId: number;
}
