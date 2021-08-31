import { Module } from '@nestjs/common';
import { MesagesModule } from '@db/mesages/mesages.module';
import { NotRecivedModule } from '@db/not-recived/not-recived.module';
import { RoomsModule } from '@db/rooms/rooms.module';
import { UsersModule } from '@db/users/users.module';

@Module({
  imports: [MesagesModule, NotRecivedModule, RoomsModule, UsersModule],
})
export class DbModule {}
