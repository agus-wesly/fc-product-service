import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HandleOrderEventsService } from '../../application/services/handle-order-event.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { OrderCreatedDTO } from '../../application/dtos/order-created.dto';

@Controller()
export class OrderEventsListener {
  constructor(
    private readonly handleOrderEvents: HandleOrderEventsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @EventPattern('order.created')
  async onOrderCreated(@Payload() data: OrderCreatedDTO) {
    console.info(`Received event order.created with payload`);
    this.handleOrderEvents.orderCreated(data.productId);
    await this.cacheManager.del(`product-${data.productId}`);
  }
}
