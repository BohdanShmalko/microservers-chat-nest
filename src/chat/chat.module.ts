import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { AuthSharedModule } from '@shared/auth-shared/auth-shared.module';
import { ChatListService } from './chat-api/chat-list/chat-list.service';
import { ChatListController } from './chat-api/chat-list/chat-list.controller';
import { ChatRoomController } from './chat-api/chat-room/chat-room.controller';
import { ChatRoomService } from './chat-api/chat-room/chat-room.service';
import { RoomsModule } from '@db/rooms/rooms.module';
import { UsersModule } from '@db/users/users.module';
import { MembersModule } from '@db/members/members.module';
import { MesagesModule } from '@db/mesages/mesages.module';
import { NotRecivedModule } from '@db/not-recived/not-recived.module';
import { ToDtoModule } from '@shared/to-dto/to-dto.module';

@Module({
  imports: [
    AuthSharedModule,
    RoomsModule,
    UsersModule,
    MembersModule,
    MesagesModule,
    NotRecivedModule,
    ToDtoModule,
  ],
  controllers: [AlertController, ChatListController, ChatRoomController],
  providers: [ChatGateway, AlertGateway, ChatListService, ChatRoomService],
})
export class ChatModule {}
