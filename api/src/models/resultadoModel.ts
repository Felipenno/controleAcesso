export class ResultadoModel{
  erro: boolean = false;
  mensagem: string = '';
  objeto: any;
  httpStatus: number;

  constructor(httpStatus: number = 500, objeto: any = null, erro: boolean = false, mensagem: string = '' ){
    this.erro = erro;
    this.mensagem = mensagem;
    this.objeto = objeto;
    this.httpStatus = httpStatus;
  }
}