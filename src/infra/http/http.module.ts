import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateProductController } from './controllers/create-product.controller'
import { CreateProductUseCase } from 'src/domain/application/use-cases/create-product'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController],
  providers: [CreateProductUseCase]
})
export class HttpModule {}
