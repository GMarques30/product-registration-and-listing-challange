import { ProductRepository } from 'src/domain/application/repositories/product-repository'
import { Product } from 'src/domain/entities/product'

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = []

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }

  async findMany(): Promise<Product[]> {
    return this.items
  }
}
