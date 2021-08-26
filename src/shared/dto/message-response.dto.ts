import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageResponseDto {
  @ApiProperty({
    example: 'ok',
    description: 'message ',
  })
  @IsString({ message: 'must be string' })
  readonly message: string;
}
