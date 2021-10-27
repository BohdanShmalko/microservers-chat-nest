import { Module } from '@nestjs/common';

import { MesagesModule } from '@db/mesages/mesages.module';
import { RoomsModule } from '@db/rooms/rooms.module';
import { UsersModule } from '@db/users/users.module';
import { FilesModule } from 'files/files.module';

@Module({
  imports: [MesagesModule, RoomsModule, UsersModule, FilesModule],
})
export class DbModule {}
