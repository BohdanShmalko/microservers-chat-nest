import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MembersService } from './members.service';
import { MembersSchema } from '@schemas/members.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ESchemasName.Members, schema: MembersSchema },
    ]),
  ],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
