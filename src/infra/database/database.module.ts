import { ProductRepository } from '../../domain/application/repositories/product-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository'

@Module({
  providers: [
    {
      provide: PrismaService,
      useClass: PrismaService
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository
    }
  ],
  exports: [PrismaService, ProductRepository]
})
export class DatabaseModule {}
