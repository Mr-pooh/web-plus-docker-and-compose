import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnhandledExceptionFilter } from './utils/filters/unhandle.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);
    const port = configService.get<number>('server.port');
    const httpAdapterHost = app.get(HttpAdapterHost);

    app.useGlobalFilters(new UnhandledExceptionFilter(httpAdapterHost));
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port);
}
bootstrap();
