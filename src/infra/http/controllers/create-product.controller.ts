import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateProductUseCase } from 'src/domain/application/use-cases/create-product'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  isAvaliableForSale: z.coerce.boolean()
})

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

@Controller('/products')
export class CreateProductController {
  constructor(private readonly createProduceUseCase: CreateProductUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createProductBodySchema))
    body: CreateProductBodySchema
  ) {
    const { name, description, price, isAvaliableForSale } = body

    const result = await this.createProduceUseCase.execute({
      name,
      description,
      price,
      isAvaliableForSale
    })

    if (result.isLeft()) throw new BadRequestException()
  }
}
