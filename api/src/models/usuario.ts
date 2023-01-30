export class Usuario{
  ID_USUARIO :string = ''
  ATIVO : boolean = false
  NOME_COMPLETO: string = ''
  EMAIL: string = ''
  TELEFONE: string = ''
  CPF: string = ''
  CARGO: string = ''
  CARGO_AREA: string = ''
  SENHA:string = ''
  DATA_CRIACAO?: Date = new Date();
  DATA_ATUALIZACAO?: Date = new Date();
}

export class UsuarioCriar{
  ATIVO : boolean = false
  NOME_COMPLETO: string = ''
  EMAIL: string = ''
  TELEFONE: string = ''
  CPF: string = ''
  CARGO: string = ''
  CARGO_AREA: string = ''
  SENHA:string = ''
  DATA_CRIACAO: Date = new Date();
  DATA_ATUALIZACAO: Date = new Date();
}

export class UsuarioLogar{
  EMAIL: string = ''
  SENHA: string = ''
}