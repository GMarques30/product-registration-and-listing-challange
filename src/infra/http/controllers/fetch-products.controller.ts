import { BadRequestException, Controller, Get } from '@nestjs/common'
import { FetchProductsUseCase } from 'src/domain/application/use-cases/fetch-products'
import { ProductPresenter } from '../presenters/product-presenter'

@Controller('/products')
export class FetchProductsController {
  constructor(private readonly fetchProductsUseCase: FetchProductsUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchProductsUseCase.execute()

    if (result.isLeft()) throw new BadRequestException()

    const { products } = result.value

    return {
      products: products.map((product) => ProductPresenter.toHttp(product))
    }
  }
}
