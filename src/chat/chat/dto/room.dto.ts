import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class RoomDto {
  @ApiProperty({
    example: '["a@gmail.com", "b@gmail.com"]',
    description: 'Room Users emails',
  })
  @IsArray({ message: 'must be string' })
  readonly users: string[];

  @ApiProperty({ example: 'default.jpeg', description: 'Room Photo' })
  @IsString({ message: 'must be string' })
  readonly photo?: string;

  @ApiProperty({ example: 'Some Name', description: 'Room Name' })
  @IsString({ message: 'must be string' })
  readonly name?: string;
}
