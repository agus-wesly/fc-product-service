import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { rabbitMQConfig } from './config/rabbitmq-options.constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice(rabbitMQConfig())
    await app.startAllMicroservices();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            exceptionFactory: (errors) => {
                const formattedErrors = {};

                errors.forEach((error) => {
                    if (error.constraints) {
                        formattedErrors[error.property] = Object.values(error.constraints)[0];
                    }
                });

                return new BadRequestException({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors: formattedErrors,
                });
            }

        })
    )

    await app.listen(process.env.PORT ?? 6969);
}
bootstrap();
