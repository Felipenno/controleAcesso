import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import usuarioService from "../services/usuarioService"
import { ResultadoModel } from "../models/resultadoModel";


class UsuarioController{

  async criar(req: FastifyRequest, res: FastifyReply){
    const validacaoFormulario = z.object({
        ATIVO: z.boolean(), 
        NOME_COMPLETO: z.string().max(100),
        EMAIL: z.string().email().max(100),
        TELEFONE: z.string().max(20),
        CPF: z.string().max(11),
        CARGO: z.string().max(100),
        CARGO_AREA: z.string().max(100),
        SENHA: z.string().max(100),
        DATA_CRIACAO: z.coerce.date(),
        DATA_ATUALIZACAO: z.coerce.date()
    })

    const requestBody = req.body as any;

    const formValidacao = validacaoFormulario.safeParse(requestBody?.usuario)
    if(!formValidacao.success){
      const resultado = new ResultadoModel(400, formValidacao.error.format(), true, "Os dados enviados são inválidos")
      res.status(resultado.httpStatus).send(resultado)
    }
    
    const formData = validacaoFormulario.parse(requestBody?.usuario)

    const resultado = await usuarioService.adicionarUsuario(formData)
    if(resultado.erro){
      res.status(resultado.httpStatus).send(resultado)
    }
    else{
      res.status(resultado.httpStatus).send(resultado)
    }
  }

  async logar(req: FastifyRequest, res: FastifyReply){
    const validacaoFormulario = z.object({
      EMAIL: z.string().email().max(100),
      SENHA: z.string().max(100)
    })

    const requestBody = req.body as any;

    const formValidacao = validacaoFormulario.safeParse(requestBody?.usuarioLogin)
    if(!formValidacao.success){
      const resultado = new ResultadoModel(400, formValidacao.error.format(), true, "Os dados enviados são inválidos")
      res.status(resultado.httpStatus).send(resultado)
    }
    
    const formData = validacaoFormulario.parse(requestBody?.usuarioLogin)

    const resultado = await usuarioService.logarUsuario(formData)
    if(resultado.erro){
      res.status(resultado.httpStatus).send(resultado)
    }
    else{
      res.header('user_id', resultado.objeto.ID_USUARIO).status(resultado.httpStatus).send(resultado)
    }
  }

  async alterar(req: FastifyRequest, res: FastifyReply){
    const validacaoFormulario = z.object({
      ID_USUARIO: z.string().uuid(),
      ATIVO: z.boolean(), 
      NOME_COMPLETO: z.string().max(100),
      EMAIL: z.string().email().max(100),
      TELEFONE: z.string().max(20),
      CPF: z.string().max(11),
      CARGO: z.string().max(100),
      CARGO_AREA: z.string().max(100),
      SENHA: z.string().max(100),
      DATA_CRIACAO: z.coerce.date().optional(),
      DATA_ATUALIZACAO: z.coerce.date()
    })

    const usuarioLogadoId = req.headers['user_id'] as string;
    if(!usuarioLogadoId){
      const resultado = new ResultadoModel(401, null, true)
      res.status(resultado.httpStatus).send(resultado)
    }

    const requestBody = req.body as any;
    const formValidacao = validacaoFormulario.safeParse(requestBody?.usuarioAlterar)

    if(!formValidacao.success){
      const resultado = new ResultadoModel(400, formValidacao.error.format(), true, "Os dados enviados são inválidos")
      res.status(resultado.httpStatus).send(resultado)
    }
    
    const formData = validacaoFormulario.parse(requestBody?.usuarioAlterar)
    const resultado = await usuarioService.alterarUsuario(formData, usuarioLogadoId)

    if(resultado.erro){
      res.status(resultado.httpStatus).send(resultado)
    }
    else{
      res.status(resultado.httpStatus).send(resultado)
    }
  }

  async remover(req: FastifyRequest, res: FastifyReply){
    const usuarioLogadoId = req.headers['user_id'] as string;
    
    if(!usuarioLogadoId){
      const resultado = new ResultadoModel(401, null, true)
      res.status(resultado.httpStatus).send(resultado)
    }

    const usuarioParams = req.params as any;
    const paramsValidacao = z.string().uuid();

    const formValidacao = paramsValidacao.safeParse(usuarioParams.id)
    if(!formValidacao.success){
      const resultado = new ResultadoModel(400, formValidacao.error.format(), true, "Os dados enviados são inválidos")
      res.status(resultado.httpStatus).send(resultado)
    }
    
    const usuarioId = paramsValidacao.parse(usuarioParams.id)
    const resultado = await usuarioService.removerUsuario(usuarioId, usuarioLogadoId)
    
    if(resultado.erro){
      res.status(resultado.httpStatus).send(resultado)
    }
    else{
      res.status(resultado.httpStatus).send(resultado)
    }
  }

  async ativarDesativar(req: FastifyRequest, res: FastifyReply){
    const usuarioLogadoId = req.headers['user_id'] as string;
    
    if(!usuarioLogadoId){
      const resultado = new ResultadoModel(401, null, true)
      res.status(resultado.httpStatus).send(resultado)
    }

    const usuarioParams = req.params as any;
    const paramsValidacao = z.string().uuid();

    const formValidacao = paramsValidacao.safeParse(usuarioParams.id)
    if(!formValidacao.success){
      const resultado = new ResultadoModel(400, formValidacao.error.format(), true, "Os dados enviados são inválidos")
      res.status(resultado.httpStatus).send(resultado)
    }
    
    const usuarioId = paramsValidacao.parse(usuarioParams.id)

    const resultado = await usuarioService.ativarDesativarUsuario(usuarioId, usuarioLogadoId)
    if(resultado.erro){
      res.status(resultado.httpStatus).send(resultado)
    }
    else{
      res.status(resultado.httpStatus).send(resultado)
    }
  }

  async listar(req: FastifyRequest, res: FastifyReply){
    const usuarioLogadoId = req.headers['user_id'] as string;
    
    if(!usuarioLogadoId){
      const resultado = new ResultadoModel(401, null, true)
      res.status(resultado.httpStatus).send(resultado)
    }

    const resultado = await usuarioService.listarUsuarios()
    if(resultado.erro){
      res.status(resultado.httpStatus).send(resultado)
    }
    else{
      res.status(resultado.httpStatus).send(resultado)
    }
  }

}

export default new UsuarioController()