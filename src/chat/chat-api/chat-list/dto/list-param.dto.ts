import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ListParamDto {
  @ApiProperty({
    example: '10',
    description: 'start element in list',
  })
  @IsString({ message: 'must be string' })
  readonly start: string;

  @ApiProperty({
    example: '10',
    description: 'how many get in list',
  })
  @IsString({ message: 'must be string' })
  readonly howMany: string;
}
