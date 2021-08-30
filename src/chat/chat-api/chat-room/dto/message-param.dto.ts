import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageParamDto {
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

  @ApiProperty({
    example: 'fklfvmgmkxflc',
    description: 'member id',
  })
  @IsString({ message: 'must be string' })
  readonly id: string;
}
