import { Product } from 'src/domain/entities/product'

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>
  abstract findMany(): Promise<Product[]>
}
