import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { AuthSharedModule } from '@shared/auth-shared/auth-shared.module';
import { ChatListService } from './chat-api/chat-list/chat-list.service';
import { ChatListController } from './chat-api/chat-list/chat-list.controller';
import { ChatRoomController } from './chat-api/chat-room/chat-room.controller';
import { ChatRoomService } from './chat-api/chat-room/chat-room.service';

@Module({
  imports: [AuthSharedModule],
  controllers: [AlertController, ChatListController, ChatRoomController],
  providers: [ChatGateway, AlertGateway, ChatListService, ChatRoomService],
})
export class ChatModule {}
