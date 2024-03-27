import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import { ProductFactory } from 'test/factories/make-product'

describe('Fetch Products Controller (E2E)', () => {
  let app: INestApplication
  let productFactory: ProductFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ProductFactory]
    }).compile()

    app = moduleRef.createNestApplication()
    productFactory = moduleRef.get(ProductFactory)

    await app.init()
  })

  test('[GET] /products', async () => {
    await Promise.all([
      productFactory.makePrismaProduct({
        name: 'Product-1'
      }),
      productFactory.makePrismaProduct({
        name: 'Product-2'
      })
    ])

    const response = await request(app.getHttpServer()).get('/products').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      products: expect.arrayContaining([
        expect.objectContaining({
          name: 'Product-1'
        }),
        expect.objectContaining({
          name: 'Product-2'
        })
      ])
    })
  })
})
