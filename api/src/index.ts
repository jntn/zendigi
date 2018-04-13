import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { AppRoutes } from './routes'

createConnection()
  .then(async connection => {
    const app = new Koa()
    const router = new Router()

    AppRoutes.forEach(route => router[route.method](route.path, route.action))

    app.use(bodyParser())
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3001)

    console.log('Zendigi API is up and running on port 3001')
  })
  .catch(error => console.log('TypeORM connection error: ', error))
