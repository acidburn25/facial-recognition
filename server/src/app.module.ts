import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { FacialRecognitionModule } from './facial-recognition/facial-recognition.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => (await configService.getDataSourceOptions()) as any,
            name: 'default',
            imports: [ConfigModule],
            inject: [ConfigService],
        }
        ),
        CacheModule.register(),
        FacialRecognitionModule,
        ConfigModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
