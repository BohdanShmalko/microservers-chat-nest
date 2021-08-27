import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MessageFileDto {
  @ApiProperty({
    example: 'Style.zip',
    description: 'file name',
  })
  @IsString({ message: 'must be string' })
  readonly name: string;

  @ApiProperty({
    example: 42991616,
    description: 'bytes size',
  })
  @IsNumber({}, { message: 'must be number' })
  readonly size: number;

  @ApiProperty({
    example: 'Any',
    description: 'file type',
  })
  @IsString({ message: 'must be string' })
  readonly type: string;

  @ApiProperty({
    example: 'http://chat/Style.zip',
    description: 'file href',
  })
  @IsString({ message: 'must be string' })
  readonly href: string;
}
