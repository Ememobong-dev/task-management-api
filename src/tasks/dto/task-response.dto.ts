import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectResponseDto } from '../../projects/dto/project-response.dto';

export class TaskResponseDto {
  @ApiProperty({
    example: 10,
  })
  id: number;

  @ApiProperty({
    example: 'Learn NestJS Swagger',
  })
  title: string;

  @ApiProperty({
    example: false,
  })
  completed: boolean;

  @ApiProperty({
    example: 1,
    nullable: true,
  })
  projectId: number | null;

  @ApiProperty({
    example: '2026-08-03T10:00:00.000Z',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-08-03T10:00:00.000Z',
    format: 'date-time',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    type: () => ProjectResponseDto,
    nullable: true,
  })
  project?: ProjectResponseDto | null;
}
