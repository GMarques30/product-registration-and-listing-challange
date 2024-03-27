import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import { PrismaService } from '../../database/prisma/prisma.service'

describe('Create Product Controller (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule]
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /products', async () => {
    const response = await request(app.getHttpServer()).post('/products').send({
      name: 'New product',
      description: 'New product description',
      price: 1.99,
      isAvaliableForSale: false
    })

    expect(response.statusCode).toBe(201)

    const productOnDatabase = await prisma.product.findFirst({
      where: {
        name: 'New product'
      }
    })

    expect(productOnDatabase).toBeTruthy()
  })
})
