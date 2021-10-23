import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'Bob', description: 'User first name' })
  @IsString({ message: 'must be string' })
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'User last name' })
  @IsString({ message: 'must be string' })
  lastName: string;

  @ApiProperty({
    example: 'user@email.com',
    description: 'user email',
  })
  @IsEmail({}, { message: 'must be email' })
  email: string;

  @ApiProperty({
    example: 'default.jpeg',
    description: 'user photo',
  })
  @IsString({ message: 'must be string' })
  photo: string;
}
