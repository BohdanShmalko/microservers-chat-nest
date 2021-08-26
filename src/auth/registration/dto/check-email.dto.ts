import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'user email',
  })
  @IsEmail({}, { message: 'must be email' })
  readonly email: string;
}
