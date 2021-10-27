import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';
import { FileDto } from './file.dto';

export class RoomDto {
  @ApiProperty({
    example: '["a@gmail.com", "b@gmail.com"]',
    description: 'Room Users emails',
  })
  @IsArray({ message: 'must be string' })
  readonly users: string[];

  readonly photo?: FileDto;

  @ApiProperty({ example: 'Some Name', description: 'Room Name' })
  @IsString({ message: 'must be string' })
  readonly name?: string;
}
