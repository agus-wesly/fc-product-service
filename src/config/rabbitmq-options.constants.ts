import { RmqOptions, Transport } from "@nestjs/microservices";

export function rabbitMQConfig(): RmqOptions {
    return {
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
            queue: '',
            queueOptions: {
                exclusive: true
            },
            exchangeType: "fanout",
            exchange: "order_service"
        }
    }
}
