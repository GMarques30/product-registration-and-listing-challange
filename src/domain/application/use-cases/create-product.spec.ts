import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { ProductRepository } from '../repositories/product-repository'
import { CreateProductUseCase } from './create-product'

describe('Create Product Use Case', () => {
  let productRepository: ProductRepository
  let sut: CreateProductUseCase

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new CreateProductUseCase(productRepository)
  })

  it('should be able to create a product', async () => {
    const result = await sut.execute({
      name: 'New product',
      description: 'New product description',
      price: 10.99,
      isAvaliableForSale: true
    })

    console.log(result.value?.product.price)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        product: expect.objectContaining({
          name: 'New product',
          description: 'New product description',
          price: 10.99,
          isAvaliableForSale: true
        })
      })
    )
  })
})
