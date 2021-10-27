import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { FileDto } from './file.dto';

export class RoomMessageDto {
  @ApiProperty({ example: 'mdmdfkldcmjhgjyjnv', description: 'Room id' })
  @IsString({ message: 'must be string' })
  readonly room: string;

  @ApiProperty({ example: 'some text', description: 'Message text' })
  @IsString({ message: 'must be string' })
  readonly message: string;

  readonly file?: FileDto;
}
