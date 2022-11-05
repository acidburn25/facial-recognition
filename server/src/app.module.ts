import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacialRecognitionModule } from './facial-recognition/facial-recognition.module';

@Module({
  imports: [FacialRecognitionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
