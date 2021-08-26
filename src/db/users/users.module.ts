import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { UsersService } from './users.service';
import { UsersSchema } from '@schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ESchemasName.Users, schema: UsersSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
