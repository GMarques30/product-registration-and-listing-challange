import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateProductController } from './controllers/create-product.controller'
import { CreateProductUseCase } from 'src/domain/application/use-cases/create-product'
import { FetchProductsUseCase } from 'src/domain/application/use-cases/fetch-products'
import { FetchProductsController } from './controllers/fetch-products.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController, FetchProductsController],
  providers: [CreateProductUseCase, FetchProductsUseCase]
})
export class HttpModule {}
