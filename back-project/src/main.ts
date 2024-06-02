import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', //Permitir solo solicitudes desde este origen
  });
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentacion del backend de Liqours')
  .setDescription('Rutas para el uso del servidor')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3001);
}
bootstrap();
