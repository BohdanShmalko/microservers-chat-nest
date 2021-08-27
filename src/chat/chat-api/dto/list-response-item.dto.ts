import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ListDataDto } from './list-data.dto';

export class ListResponseItemDto {
  @ApiProperty({
    example: 'someuniqueid',
    description: 'item id',
  })
  @IsString({ message: 'must be string' })
  readonly id: string;

  @ApiProperty({
    example: {
      firstName: 'Luy',
      lastName: 'Robin',
      photo: 'luy',
      noChecked: 2,
      message:
        'Most of its text is made up from sections 1.10.32–3 of Cicero De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes).',
      time: 1629471112000,
      online: true,
      status: '...writes',
    },
    description: 'list item data',
  })
  readonly data: ListDataDto;
}
