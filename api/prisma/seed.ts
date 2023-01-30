import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function run(){
  await prisma.permissao.deleteMany()

  await prisma.permissao.create({
    data: {
      ID_PERMISSAO: 1,
      DESCRICAO_PERMISSAO: 'ADMINISTRADOR'
    }
  })

  await prisma.permissao.create({
    data: {
      ID_PERMISSAO: 2,
      DESCRICAO_PERMISSAO: 'GERENTE'
    }
  })

  await prisma.permissao.create({
    data: {
      ID_PERMISSAO: 3,
      DESCRICAO_PERMISSAO: 'USUARIO'
    }
  })
}

run().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})

