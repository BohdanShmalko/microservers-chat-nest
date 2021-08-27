import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MessageListDto } from './message-list.dto';

export class ChatRoomResponseDto {
  @ApiProperty({
    example: 'Nika Jerrardo',
    description: 'room name',
  })
  @IsString({ message: 'must be string' })
  readonly name: string;

  @ApiProperty({
    example: false,
    description: 'is room?',
  })
  @IsBoolean({ message: 'must be boolean' })
  readonly isRoom: boolean;

  @ApiProperty({
    example: 'http://chat/image.jpeg',
    description: 'room photo',
  })
  @IsString({ message: 'must be string' })
  readonly photo: string;

  @ApiProperty({
    example: 1629891189000,
    description: 'last online',
  })
  @IsNumber({}, { message: 'must be number' })
  readonly online: number;

  @ApiProperty({
    example: [
      {
        id: 'bfbnfvbnfvnmdcmcd',
        type: 'Member',
        date: 1629876414000,
        photo: '/assets/img/jared.png',
        file: {
          name: 'Style.zip',
          size: 42991616,
          type: 'Any',
          href: 'http://chat/Style.zip',
        },
      },
    ],
    description: 'list item data',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageListDto)
  readonly messageList: MessageListDto[];
}
