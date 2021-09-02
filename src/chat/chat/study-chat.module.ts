import { Module } from '@nestjs/common';
import { StudyChatGateway } from './study-chat.gateway';
import { StudyChatService } from './study-chat.service';
import { AuthSharedModule } from '@shared/auth-shared/auth-shared.module';

@Module({
  imports: [AuthSharedModule],
  providers: [StudyChatService, StudyChatGateway],
  exports: [StudyChatService, StudyChatGateway],
})
export class StudyChatModule {}
