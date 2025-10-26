import { RmqOptions, Transport } from "@nestjs/microservices";

export function rabbitMQConfig(): RmqOptions {
    return {
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
            queue: 'app_queue',
            queueOptions: {
                durable: true,
            },
        }
    }
}
