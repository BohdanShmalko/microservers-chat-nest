import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ListDataDto {
  @ApiProperty({ example: 'Bob', description: 'User first name' })
  @IsString({ message: 'must be string' })
  readonly firstName: string;

  @ApiProperty({ example: 'Smith', description: 'User last name' })
  @IsString({ message: 'must be string' })
  readonly lastName: string;

  @ApiProperty({
    example: 'http://chat/image.jpeg',
    description: 'chat photo',
  })
  @IsString({ message: 'must be string' })
  readonly photo: string;

  @ApiProperty({
    example: 2,
    description: 'no checked messages',
  })
  @IsNumber({}, { message: 'must be number' })
  readonly noChecked: number;

  @ApiProperty({
    example: 'some message',
    description: 'chat text',
  })
  @IsString({ message: 'must be string' })
  readonly message: string;

  @ApiProperty({
    example: 23278345623479,
    description: 'created time',
  })
  @IsNumber({}, { message: 'must be number' })
  readonly time: number;

  @ApiProperty({
    example: true,
    description: 'is online user?',
  })
  @IsBoolean({ message: 'must be boolean' })
  readonly online: boolean;

  @ApiProperty({
    example: '...writing',
    description: 'user status',
  })
  @IsString({ message: 'must be string' })
  readonly status: string;
}
