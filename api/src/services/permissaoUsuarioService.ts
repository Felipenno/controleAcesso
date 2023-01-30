import { PermissaoUsuarioRepository } from "../database/permissaoUsuarioRepository";
import { PermissaoNivel } from "../models/enum/permissaoNivel";
import { PermissaoUsuario, PermissaoUsuarioCriar } from "../models/permissaoUsuario";
import { ResultadoModel } from '../models/resultadoModel';


class PermissaoUsuarioService{
  permissaoUsuarioRepo = new PermissaoUsuarioRepository();

  async adicionarPermissaoUsuario(permissaoUsuario: PermissaoUsuarioCriar, usuarioLogadoId: string){
    const usuarioLogado = await this.permissaoUsuarioRepo.obterPermissaoUsuario(usuarioLogadoId);

    if(usuarioLogado && usuarioLogado.permissao.ID_PERMISSAO === PermissaoNivel.Administrador){
      await this.permissaoUsuarioRepo.adicionarPermissaoUsuario(permissaoUsuario);

      return new ResultadoModel(200, null, false, 'Permissão adicionada!');
    }

    return new ResultadoModel(500, null, true, 'Não foi possível adicionar permissão!');
  }

  async alterarPermissaoUsuario(permissaoUsuario: PermissaoUsuario, usuarioLogadoId: string){
    const usuarioLogado = await this.permissaoUsuarioRepo.obterPermissaoUsuario(usuarioLogadoId);
    
    if(usuarioLogado && usuarioLogado.permissao.ID_PERMISSAO === PermissaoNivel.Administrador){
      await this.permissaoUsuarioRepo.alterarPermissaoUsuario(permissaoUsuario);

      return new ResultadoModel(200, null, false, 'Permissão alterada!');
    }

    return new ResultadoModel(500, null, false, 'Não foi possível alterar permissão!');    
  }
}

export default new PermissaoUsuarioService()