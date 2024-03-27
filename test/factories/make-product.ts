import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Product, ProductProps } from 'src/domain/entities/product'
import { faker } from '@faker-js/faker'

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
