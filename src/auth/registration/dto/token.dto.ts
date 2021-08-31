import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    example: 'fvlkfkfkllkrf',
    description: 'token',
  })
  @IsString({ message: 'must be string' })
  readonly token: string;
}
