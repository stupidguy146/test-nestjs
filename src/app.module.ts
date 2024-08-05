import { Module } from '@nestjs/common';
import { AppController } from './modules/member/controllers/http/member-http.controller';
import { AppService } from './modules/member/services/member.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
