import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { MessageFileDto } from '../../chat-api/chat-room/dto/message-file.dto';

export class MessageResponseDto {
  @ApiProperty({
    example: 'gfjhgfhgfhjfghgfjkl',
    description: 'unique id',
  })
  @IsString({ message: 'must be string' })
  readonly id: string;

  @ApiProperty({
    example: 'user@email.com',
    description: 'user email',
  })
  @IsEmail({}, { message: 'must be email' })
  readonly email: string;

  @ApiProperty({
    example: 'http://chat/image.jpeg',
    description: 'room photo',
  })
  @IsString({ message: 'must be string' })
  readonly photo: string;

  @ApiProperty({
    example:
      'Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.',
    description: 'message text',
  })
  @IsString({ message: 'must be string' })
  readonly text: string;

  @ApiProperty({
    example: 23278345623479,
    description: 'created date',
  })
  @IsNumber({}, { message: 'must be number' })
  readonly date: number;

  @ApiProperty({
    example: 'read',
    description: 'message status',
  })
  readonly status?: string;

  @ApiProperty({
    example: {
      name: 'Style.zip',
      size: 42991616,
      type: 'Any',
      href: 'http://chat/Style.zip',
    },
    description: 'message file',
  })
  readonly file?: MessageFileDto;
}
