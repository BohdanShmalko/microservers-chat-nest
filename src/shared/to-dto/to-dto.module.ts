import { Module } from '@nestjs/common';
import { ToDtoService } from './to-dto.service';

@Module({
  imports: [],
  providers: [ToDtoService],
  exports: [ToDtoService],
})
export class ToDtoModule {}
