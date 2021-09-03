import { Module } from '@nestjs/common';

import { AuthSharedModule } from '@shared/auth-shared/auth-shared.module';
import { ChatListService } from './chat-api/chat-list/chat-list.service';
import { ChatListController } from './chat-api/chat-list/chat-list.controller';
import { ChatRoomController } from './chat-api/chat-room/chat-room.controller';
import { ChatRoomService } from './chat-api/chat-room/chat-room.service';
import { RoomsModule } from '@db/rooms/rooms.module';
import { UsersModule } from '@db/users/users.module';
import { MesagesModule } from '@db/mesages/mesages.module';
import { ToDtoModule } from '@shared/to-dto/to-dto.module';
import { StudyChatModule } from './chat/study-chat.module';

@Module({
  imports: [
    AuthSharedModule,
    RoomsModule,
    UsersModule,
    MesagesModule,
    ToDtoModule,
    StudyChatModule,
  ],
  controllers: [ChatListController, ChatRoomController],
  providers: [ChatListService, ChatRoomService],
})
export class ChatModule {}
