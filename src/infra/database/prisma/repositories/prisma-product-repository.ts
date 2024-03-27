import { ProductRepository } from 'src/domain/application/repositories/product-repository'
import { Product } from 'src/domain/entities/product'
import { PrismaService } from '../prisma.service'
import { PrismaProductMapper } from '../mappers/prisma-product-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.create({
      data
    })
  }

  async findMany(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        price: 'asc'
      }
    })

    return products.map((product) => PrismaProductMapper.toDomain(product))
  }
}
