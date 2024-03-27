import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Product, ProductProps } from 'src/domain/entities/product'
import { faker } from '@faker-js/faker'
import { PrismaService } from '../../src/infra/database/prisma/prisma.service'
import { PrismaProductMapper } from 'src/infra/database/prisma/mappers/prisma-product-mapper'
import { Injectable } from '@nestjs/common'

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityID
) {
  const produtct = Product.create(
    {
      name: faker.lorem.sentence(),
      description: faker.lorem.text(),
      price: faker.number.float(),
      isAvaliableForSale: true,
      ...override
    },
    id
  )

  return produtct
}

@Injectable()
export class ProductFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaProduct(data: Partial<ProductProps> = {}): Promise<Product> {
    const product = makeProduct(data)

    await this.prisma.product.create({
      data: PrismaProductMapper.toPrisma(product)
    })

    return product
  }
}
