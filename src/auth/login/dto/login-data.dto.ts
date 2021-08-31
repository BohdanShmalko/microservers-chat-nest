import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDataDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'user email',
  })
  @IsEmail({}, { message: 'must be email' })
  readonly email: string;

  @ApiProperty({ example: 'some secret', description: 'User password' })
  @IsString({ message: 'must be string' })
  readonly password: string;
}
