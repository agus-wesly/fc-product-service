import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HandleOrderEventsService } from '../../application/services/handle-order-event.service';

@Controller()
export class OrderEventsListener {
    constructor(
        private readonly handleOrderEvents: HandleOrderEventsService,
    ){}

    @EventPattern('order.created')
    async onOrderCreated(@Payload() data: any) {
        console.log("Received", data)
        this.handleOrderEvents.orderCreated(data)
    }
}
