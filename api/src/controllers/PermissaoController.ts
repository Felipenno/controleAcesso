import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import permissaoUsuarioService from "../services/permissaoUsuarioService";
import { ResultadoModel } from "../models/resultadoModel";

class PermissaoController{
  async adicionar(req: FastifyRequest, res: FastifyReply){
    const usuarioLogadoId = req.headers['user_id'] as string;

    if(!usuarioLogadoId){
      const resultado = new ResultadoModel(401, null, true)
      res.status(resultado.httpStatus).send(resultado)
    }

    const validacaoFormulario = z.object({
        FK_ID_USUARIO : z.string().uuid(),
        FK_ID_PERMISSAO: z.number()
    })

    const requestBody = (req.body as any).permissaoUsuario;
    const formValidacao = validacaoFormulario.safeParse(requestBody)

    if(!formValidacao.success){
      const resultado = new ResultadoModel(400, formValidacao.error.format(), true, "Os dados enviados são inválidos")
      res.status(resultado.httpStatus).send(resultado)
    }
    
    const formData = validacaoFormulario.parse(requestBody)
    const resultado = await permissaoUsuarioService.adicionarPermissaoUsuario(formData, usuarioLogadoId)

    if(resultado.erro){
      res.status(resultado.httpStatus).send(resultado)
    }
    else{
      res.status(resultado.httpStatus).send(resultado)
    }
  }

  async alterar(req: FastifyRequest, res: FastifyReply){
    const usuarioLogadoId = req.headers['user_id'] as string;

    if(!usuarioLogadoId){
      const resultado = new ResultadoModel(401, null, true)
      res.status(resultado.httpStatus).send(resultado)
    }

    const validacaoFormulario = z.object({
        ID_PERMISSAO_USUARIO: z.number(),
        FK_ID_USUARIO: z.string().uuid(), 
        FK_ID_PERMISSAO: z.number()
    })

    const requestBody = (req.body as any).permissaoUsuario;
    const formValidacao = validacaoFormulario.safeParse(requestBody)

    if(!formValidacao.success){
      const resultado = new ResultadoModel(400, formValidacao.error.format(), true, "Os dados enviados são inválidos")
      res.status(resultado.httpStatus).send(resultado)
    }
    
    const formData = validacaoFormulario.parse(requestBody)
    const resultado = await permissaoUsuarioService.alterarPermissaoUsuario(formData, usuarioLogadoId)

    if(resultado.erro){
      res.status(resultado.httpStatus).send(resultado)
    }
    else{
      res.status(resultado.httpStatus).send(resultado)
    }
  }
}

export default new PermissaoController()