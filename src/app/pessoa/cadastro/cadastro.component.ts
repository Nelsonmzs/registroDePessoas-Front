import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {PessoaService} from '../../services/pessoa.service';
 
import {Pessoa} from '../../services/pessoa';
 
import {Response} from '../../services/response';
 
import { Observable } from 'rxjs/Observable';
 
@Component({
    selector: 'app-cadastro-pessoa',
    templateUrl: './cadastro.component.html',
    styleUrls:["./cadastro.component.css"]
  })

  export class CadastroComponent implements OnInit {

    public titulo:string;
    public pessoa:Pessoa = new Pessoa();
    
    constructor( private pessoaService: PessoaService, 
        private router: Router, 
        private activatedRoute: ActivatedRoute) {}

    /** CARREGADO NA INICIALIZAÇÃO DO COMPONENT */
    ngOnInit() {

        this.activatedRoute.params.subscribe(parametro => {
            
            if (parametro["codigo"] == undefined) {
                
                this.titulo = "Novo cadastro de pessoa";

            } else {

                this.titulo = "Editar cadastro de pessoa";
                this.pessoaService.getPessoa(Number(parametro["codigo"])).subscribe(res => this.pessoa = res);

            }

        });
    }

    /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
    salvar():void {

        /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
        if(this.pessoa.id == undefined) {

        /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
        this.pessoaService.adicionarPessoa(this.pessoa).subscribe(response => {

        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res:Response = <Response>response;

        /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
        E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
        if (res.codigo == 1) {
               alert(res.mensagem);
               this.pessoa = new Pessoa();

           } else {

             /* ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
             NO SERVIDOR (CODIGO = 0)*/
             alert(res.mensagem);
           }
        },

        (erro) => {

              /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
             EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API */                 
             alert(erro);
        });

        } else {

        /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
        this.pessoaService.atualizaPessoa(this.pessoa).subscribe(response => {

        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res:Response = <Response> response;

        /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
        E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/
        if (res.codigo == 1) {
            alert(res.mensagem);
            this.router.navigate(['/consulta-pessoa']);

        } else {
        /*ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
          NO SERVIDOR (CODIGO = 0)*/
            alert(res.mensagem);

        }
    },

    (erro) => {
        /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
          EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API */                 
          alert(erro);

       });
     }
   } 
}