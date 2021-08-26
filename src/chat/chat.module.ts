import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { AuthSharedModule } from '@shared/auth-shared/auth-shared.module';
import { ChatApiService } from './chat-api/chat-api.service';
import { ChatApiController } from './chat-api/chat-api.controller';

@Module({
  imports: [AuthSharedModule],
  controllers: [AlertController, ChatApiController],
  providers: [ChatGateway, AlertGateway, ChatApiService],
})
export class ChatModule {}
