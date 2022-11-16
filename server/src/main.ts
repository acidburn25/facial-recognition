import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const helmet = require('helmet');
    const config = new ConfigService();
    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
            transform: true,
        }),
    );

    app.use(json({ limit: '50mb' }));
    app.enableCors({ origin: [/.rindegastos.com$/, /localhost:[0-9]{4}$/, /^io.ionic.starter:/, 'io.ionic.starter://home/signin', /localhost/] });
    app.use(helmet());

    await app.listen(await config.getPortConfig());
}
bootstrap();
