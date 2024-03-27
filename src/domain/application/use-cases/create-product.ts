import { Either, right } from 'src/core/either'
import { Product } from 'src/domain/entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface CreateProductInput {
  name: string
  description: string
  price: number
  isAvaliableForSale: boolean
}

type CreateProductOutput = Either<
  null,
  {
    product: Product
  }
>

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    name,
    description,
    price,
    isAvaliableForSale
  }: CreateProductInput): Promise<CreateProductOutput> {
    const product = Product.create({
      name,
      description,
      price,
      isAvaliableForSale
    })

    await this.productRepository.create(product)

    return right({
      product
    })
  }
}
