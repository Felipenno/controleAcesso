import { FastifyInstance } from "fastify"

import UsuarioController from "../controllers/UsuarioController"
import PermissaoController from "../controllers/PermissaoController";

export async function appRoutes(app: FastifyInstance){
  app.post('/usuario', UsuarioController.criar);
  app.post('/usuario/logar', UsuarioController.logar);
  app.put('/usuario', UsuarioController.alterar);
  app.put('/usuario/:id', UsuarioController.ativarDesativar);
  app.delete('/usuario/:id', UsuarioController.remover);
  app.get('/usuario', UsuarioController.listar);


  app.post('/permissao', PermissaoController.adicionar);
  app.put('/permissao', PermissaoController.alterar);

}