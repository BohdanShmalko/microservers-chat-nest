import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class FileDto {
  @ApiProperty({
    example: 'default.jpeg',
    description: 'Room Users emails',
  })
  @IsString({ message: 'must be string' })
  readonly originalName: string;

  @ApiProperty({ example: '20000', description: 'file Size' })
  @IsNumber()
  readonly size: number;

  readonly buffer: string;
}
