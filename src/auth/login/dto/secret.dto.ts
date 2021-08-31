import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SecretDto {
  @ApiProperty({ example: 'some secret', description: 'User secret key' })
  @IsString({ message: 'must be string' })
  readonly secretKey: string;
}
