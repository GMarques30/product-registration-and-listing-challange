import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export interface ProductProps {
  name: string
  description: string
  price: number
  isAvaliableForSale: boolean
}

export class Product extends Entity<ProductProps> {
  static create(props: ProductProps, id?: UniqueEntityID) {
    const product = new Product(
      {
        ...props
      },
      id
    )
    return product
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get price() {
    return this.props.price.toFixed(2)
  }

  get isAvaliableForSale() {
    return this.props.isAvaliableForSale
  }

  changeIsAvaliableForSale() {
    this.props.isAvaliableForSale = !this.props.isAvaliableForSale
  }
}
