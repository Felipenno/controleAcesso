import { prisma } from '../lib/prisma';
import { PermissaoUsuario, PermissaoUsuarioCriar } from '../models/permissaoUsuario';

export class PermissaoUsuarioRepository {

  async adicionarPermissaoUsuario(permissaoUsuario: PermissaoUsuarioCriar){
    await prisma.permissaoUsuario.create({ data: permissaoUsuario})
  }

  async alterarPermissaoUsuario(permissaoUsuario: PermissaoUsuario){
    await prisma.permissaoUsuario.update({
      where: { FK_ID_USUARIO: permissaoUsuario.FK_ID_USUARIO},
      data: { FK_ID_PERMISSAO: permissaoUsuario.FK_ID_PERMISSAO }
    })
  }

  async obterPermissaoUsuario(idUsuario: string){
    return await prisma.permissaoUsuario.findFirst({
      where: { FK_ID_USUARIO: idUsuario},
      include: { permissao: true }
    })
  }

}