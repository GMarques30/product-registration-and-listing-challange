import { Either, right } from 'src/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { Product } from 'src/domain/entities/product'

type FetchProductOutput = Either<
  null,
  {
    products: Product[]
  }
>

export class FetchProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<FetchProductOutput> {
    const products = await this.productRepository.findMany()

    return right({
      products
    })
  }
}
