import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new ConfigService();
    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
            transform: true,
        }),
    );

    app.enableCors({ origin: [/.rindegastos.com$/, /localhost:[0-9]{4}$/, /^io.ionic.starter:/, 'io.ionic.starter://home/signin', /localhost/] });

    await app.listen(await config.getPortConfig());
}
bootstrap();
