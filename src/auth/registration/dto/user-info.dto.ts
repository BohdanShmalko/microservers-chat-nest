import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserInfoDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'user email',
  })
  @IsEmail({}, { message: 'must be email' })
  readonly email: string;

  @ApiProperty({ example: 'Bob', description: 'User first name' })
  @IsString({ message: 'must be string' })
  readonly firstName: string;

  @ApiProperty({ example: 'Smith', description: 'User last name' })
  @IsString({ message: 'must be string' })
  readonly lastName: string;

  @ApiProperty({ example: 'some secret', description: 'User password' })
  @IsString({ message: 'must be string' })
  readonly password: string;

  @ApiProperty({ example: 'some secret', description: 'User secret key' })
  @IsString({ message: 'must be string' })
  readonly secretKey: string;
}
