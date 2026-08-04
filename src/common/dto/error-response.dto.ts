import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    oneOf: [
      {
        type: 'string',
        example: 'Task with ID 99 was not found',
      },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message: string | string[];

  @ApiProperty({
    example: '/tasks/99',
  })
  path: string;

  @ApiProperty({
    example: '2026-08-03T12:30:00.000Z',
    format: 'date-time',
  })
  timestamp: string;
}
