import { Product } from 'src/domain/entities/product'

export interface ProductRepository {
  create(product: Product): Promise<void>
  findMany(): Promise<Product[]>
}
