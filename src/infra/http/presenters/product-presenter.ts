import { Product } from 'src/domain/entities/product'

export class ProductPresenter {
  static toHttp(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price.toFixed(2),
      isAvaliableForSale: product.isAvaliableForSale
    }
  }
}
