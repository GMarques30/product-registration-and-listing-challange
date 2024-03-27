import { ProductRepository } from 'src/domain/application/repositories/product-repository'
import { makeProduct } from 'test/factories/make-product'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { FetchProductsUseCase } from './fetch-products'

describe('Fetch Product Use Case', () => {
  let productRepository: ProductRepository
  let sut: FetchProductsUseCase

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new FetchProductsUseCase(productRepository)
  })

  it('should be able to search for all products', async () => {
    const product1 = makeProduct({
      name: 'product-1'
    })
    const product2 = makeProduct({
      name: 'product-2'
    })

    await productRepository.create(product1)
    await productRepository.create(product2)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        products: expect.arrayContaining([
          expect.objectContaining({
            name: 'product-1'
          }),
          expect.objectContaining({
            name: 'product-2'
          })
        ])
      })
    )
  })
})
