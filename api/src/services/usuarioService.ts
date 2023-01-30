import { PermissaoNivel } from '../models/enum/permissaoNivel';
import { UsuarioRepository } from '../database/usuarioRepository';
import { PermissaoUsuarioRepository } from "../database/permissaoUsuarioRepository";
import { Usuario, UsuarioCriar, UsuarioLogar  } from '../models/usuario';
import { ResultadoModel } from '../models/resultadoModel';


class UsuarioService {
  usuarioRepo = new UsuarioRepository();
  permissaoUsuarioRepo = new PermissaoUsuarioRepository();

  async adicionarUsuario(usuario: UsuarioCriar){
    await this.usuarioRepo.criarUsuario(usuario);

    return new ResultadoModel(201, null, false, 'Cadastro realizado com sucesso!');
  }

  async logarUsuario(usuario: UsuarioLogar){
    const result = await this.usuarioRepo.loginUsuario(usuario);
    if(result){
      return new ResultadoModel(200, result, false)
    }
    else{
      return new ResultadoModel(401, null, true, 'Dados inválidos, verifique!')
    }

  }

  async alterarUsuario(usuario: Usuario, usuarioLogadoId: string){
    const usuarioLogado = await this.permissaoUsuarioRepo.obterPermissaoUsuario(usuarioLogadoId);

    if(usuarioLogado && (usuarioLogado.permissao.ID_PERMISSAO === PermissaoNivel.Administrador || usuarioLogado.permissao.ID_PERMISSAO === PermissaoNivel.Gerente)){
      await this.usuarioRepo.alterarUsuario(usuario);

      return new ResultadoModel(200, null, false, 'Usuário alterado com sucesso!');
    }

    return new ResultadoModel(500, null, true, 'Não foi possível fazer a alteração!');
  }

  async removerUsuario(idUsuario: string, usuarioLogadoId: string){
    const usuarioLogado = await this.permissaoUsuarioRepo.obterPermissaoUsuario(usuarioLogadoId);

    if(usuarioLogado && usuarioLogado.permissao.ID_PERMISSAO === PermissaoNivel.Administrador){
      await this.usuarioRepo.removerUsuario(idUsuario);

      return new ResultadoModel(200, null, false, 'Usuário removido com sucesso!');
    }

    return new ResultadoModel(500, null, true, 'Não foi possível remover o usuário!');
  }

  async ativarDesativarUsuario(idUsuario: string, usuarioLogadoId: string){
    const usuarioLogado = await this.permissaoUsuarioRepo.obterPermissaoUsuario(usuarioLogadoId);

    if(usuarioLogado && usuarioLogado.permissao.ID_PERMISSAO === PermissaoNivel.Administrador){
      await this.usuarioRepo.ativarDesativarUsuario(idUsuario);

      return new ResultadoModel(200, null, false, `Usuário alterado`);
    }

    return new ResultadoModel(500, null, true, 'Não foi possível alterar o usuário!');
  }

  async listarUsuarios(){
    const result = await this.usuarioRepo.listarUsuarios();
    if(result){
      return new ResultadoModel(200, result, false);
    }

    return new ResultadoModel(204, result, true, 'Nada encontrado');
  }
}

export default new UsuarioService();