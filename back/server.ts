import fastify from 'fastify'
import { ZenStackFastifyPlugin } from '@zenstackhq/server/fastify'
import {
  PrismaClient
} from '../db/.prisma/client'
import { enhance } from '@zenstackhq/runtime'
import { init } from '@paralleldrive/cuid2'

const getPrismaZen = (user: any) => {
  const prismaLog = new PrismaClient()

  return enhance(prismaLog, user)
}

const createCUID = init({
  length: 24
})

const server = fastify({
  logger: true
})

const now = Date.now()
console.log('Zenstack register plugin')
import * as zod from '../db/zod'
server.register(ZenStackFastifyPlugin, {
  prefix: '/api/model',
  zodSchemas: zod as any,
  getPrisma: async (request) => getPrismaZen(undefined)
})
console.log('Zenstack register plugin   ' + ((Date.now() - now)/1000))

const start = async () => {
  try {
    await server.listen({
      port: 3001
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
