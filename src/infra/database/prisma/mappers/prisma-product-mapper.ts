import { Prisma, Product as PrismaProduct } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Product } from 'src/domain/entities/product'

export class PrismaProductMapper {
  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      isAvaliableForSale: product.isAvaliableForSale
    }
  }

  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        price: raw.price,
        isAvaliableForSale: raw.isAvaliableForSale
      },
      new UniqueEntityID(raw.id)
    )
  }
}
