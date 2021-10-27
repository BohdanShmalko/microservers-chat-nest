import { Module } from '@nestjs/common';

import { StudyChatGateway } from './study-chat.gateway';
import { StudyChatService } from './study-chat.service';
import { AuthSharedModule } from '@shared/auth-shared/auth-shared.module';
import { UsersModule } from '@db/users/users.module';
import { RoomsModule } from '@db/rooms/rooms.module';
import { MesagesModule } from '@db/mesages/mesages.module';
import { ToDtoModule } from '@shared/to-dto/to-dto.module';
import { FilesModule } from 'files/files.module';

@Module({
  imports: [
    AuthSharedModule,
    UsersModule,
    RoomsModule,
    MesagesModule,
    ToDtoModule,
    FilesModule,
  ],
  providers: [StudyChatService, StudyChatGateway],
  exports: [StudyChatService, StudyChatGateway],
})
export class StudyChatModule {}
