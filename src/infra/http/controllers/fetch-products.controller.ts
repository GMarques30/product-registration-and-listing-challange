import { Controller, Get } from '@nestjs/common'
import { FetchProductsUseCase } from 'src/domain/application/use-cases/fetch-products'

@Controller('/products')
export class FetchProductsController {
  constructor(private readonly fetchProductsUseCase: FetchProductsUseCase) {}

  @Get()
  async handle() {}
}
