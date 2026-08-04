import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Backend Learning',
  })
  name: string;

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
}
