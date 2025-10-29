import { Test } from "@nestjs/testing"
import { OrderEventsListener } from "./order-events.listener"
import { HandleOrderEventsService } from "../../application/services/handle-order-event.service"
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { OrderCreatedPayload } from "./order-events.listener"

describe("OrderEventsListener", () => {
    let orderEventsListener: OrderEventsListener
    const delCacheMockFn = jest.fn()
    const orderCreatedMockFn = jest.fn()

    beforeEach(async () => {
        const TestingModule = await Test.createTestingModule({
            providers: [
                OrderEventsListener,
                {
                    provide: CACHE_MANAGER,
                    useValue: {
                        del: delCacheMockFn,
                    }
                },
                {
                    provide: HandleOrderEventsService,
                    useValue: {
                        orderCreated: orderCreatedMockFn,
                    }
                }
            ]
        }).compile()

        orderEventsListener = TestingModule.get<OrderEventsListener>(OrderEventsListener)
    })

    it("Should handle order.created event", async () => {
        const payload: OrderCreatedPayload = {
            id: "12345678",
            productId: "12345678"
        };
        orderEventsListener.onOrderCreated(payload)
        expect(orderCreatedMockFn).toHaveBeenCalled()
        expect(delCacheMockFn).toHaveBeenCalled()
    })
})
