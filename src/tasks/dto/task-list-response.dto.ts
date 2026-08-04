import { ApiProperty } from '@nestjs/swagger';
import { TaskResponseDto } from './task-response.dto';

export class PaginationMetaDto {
  @ApiProperty({
    example: 1,
  })
  page: number;

  @ApiProperty({
    example: 10,
  })
  limit: number;

  @ApiProperty({
    example: 25,
  })
  total: number;

  @ApiProperty({
    example: 3,
  })
  totalPages: number;

  @ApiProperty({
    example: true,
  })
  hasNextPage: boolean;

  @ApiProperty({
    example: false,
  })
  hasPreviousPage: boolean;
}

export class TaskListResponseDto {
  @ApiProperty({
    type: [TaskResponseDto],
  })
  data: TaskResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
