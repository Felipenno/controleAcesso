import { Usuario, UsuarioCriar, UsuarioLogar } from '../models/usuario';
import { prisma } from '../lib/prisma';

export class UsuarioRepository {

  async criarUsuario(usuario: UsuarioCriar){
    const result = await prisma.usuario.create({ data: usuario})
    console.log('criarUsuario', result)
  }

  async loginUsuario(usuario: UsuarioLogar){
    return await prisma.usuario.findFirst({
      where: { 
        EMAIL: usuario.EMAIL,
        SENHA: usuario.SENHA
      },
      include: { 
        PermissaoUsuario: { include: { permissao : { select: {permissaoUsuarios: true, DESCRICAO_PERMISSAO: true} } } }
      }

    })
  }

  async alterarUsuario(usuario: Usuario){
    await prisma.usuario.update({ 
      where: { ID_USUARIO: usuario.ID_USUARIO }, 
      data: usuario
    })
  }

  async removerUsuario(idUsuario: string){
    prisma.usuario.delete({ 
      where: {
        ID_USUARIO: idUsuario
      }
    })
  }

  async ativarDesativarUsuario(idUsuario: string){
    const usuarioRetornado = await this.obterUsuarioPorId(idUsuario);

    if(usuarioRetornado){

      if(usuarioRetornado.ATIVO){
        await prisma.usuario.update({ 
          where: { ID_USUARIO: idUsuario}, 
          data: { ATIVO: false }
        })
      }
      else{
        await prisma.usuario.update({ 
          where: { ID_USUARIO: idUsuario }, 
          data: { ATIVO: true }
        })
      }
    }
    
  }

  async obterUsuarioPorId(idUsuario: string){
    return await prisma.usuario.findFirst({
      where: { ID_USUARIO: idUsuario },
      include: { 
        PermissaoUsuario: { include: { permissao : { select: {permissaoUsuarios: true, DESCRICAO_PERMISSAO: true} } } }
      }
    })
  }

  async listarUsuarios(){
    return await prisma.usuario.findMany({
      include: { 
        PermissaoUsuario: { include: { permissao : { select: {permissaoUsuarios: true, DESCRICAO_PERMISSAO: true} } } }
      }
    });
  }
  

}