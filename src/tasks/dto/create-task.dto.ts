import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsInt()
  @Min(1)
  projectId: number;
}
