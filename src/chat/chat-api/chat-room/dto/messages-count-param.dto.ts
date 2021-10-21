import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessagesCountParamDto {
  @ApiProperty({
    example: 'fklfvmgmkxflc',
    description: 'room id',
  })
  @IsString({ message: 'must be string' })
  readonly id: string;
}
