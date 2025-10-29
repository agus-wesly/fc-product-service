import { Test } from "@nestjs/testing";
import { ProductsService } from "./application/services/products.service";
import { ProductsController } from "./products.controller"
import { CreateProductDTO } from "./application/dtos/create-product.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ProductEntity } from "./domain/entities/product.entity";
import { NotFoundException } from "@nestjs/common";

describe('ProductController', () => {
    let productsController: ProductsController
    let emitMockFn = jest.fn()
    let getCacheMockFn = jest.fn()
    let setCacheMockFn = jest.fn()
    let findByIdMockFn = jest.fn()

    beforeEach(async () => {
        const TestingModule = await Test.createTestingModule({
            providers: [
                ProductsController,
                {
                    provide: 'ORDER_SERVICE',
                    useValue: {
                        emit: emitMockFn,
                    }
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: {
                        get: getCacheMockFn,
                        set: setCacheMockFn,
                    }
                },
                {
                    provide: ProductsService,
                    useValue: {
                        create: jest.fn((x) => x),
                        findById: findByIdMockFn,
                    }
                }
            ]
        }).compile()

        productsController = TestingModule.get<ProductsController>(ProductsController)
    })

    describe("POST products", () => {
        it("Should create new product", async () => {
            const newProductData = new CreateProductDTO()
            newProductData.name = "Ink"
            newProductData.price = 100
            newProductData.qty = 69

            const newProduct = await productsController.create(newProductData)
            expect(newProduct).toEqual(newProductData)
        })

        it("Should emit event after create new product", () => {
            expect(emitMockFn).toHaveBeenCalled()
        })
    })

    describe("GET product", () => {
        const product = new ProductEntity()
        product.id = '12345678'
        product.name = "Ink"
        product.price = 100
        product.qty = 69
        product.createdAt = new Date()

        getCacheMockFn.mockResolvedValue(null)

        findByIdMockFn.mockImplementation((id) => {
            if (id === product.id) return product
            return null
        })

        it("Should return product by id", async () => {
            const newProduct = await productsController.findById(product.id)
            getCacheMockFn.mockResolvedValueOnce(product) // Simulate the insertion into cache
            expect(newProduct).toEqual(product)
        })

        it("Should return product by id from cache", async () => {
            await productsController.findById(product.id)
            const valueFromCache = await getCacheMockFn.mock.results.at(-1)?.value
            expect(valueFromCache).toEqual(product)
        })

        it("Should throw NotFoundException if product is not found", async () => {
            const randomProductId = "randomId"
            await expect(productsController.findById(randomProductId)).rejects.toBeInstanceOf(NotFoundException)
        })
    })
})
// 
// describe('Should handle event', () => { })
