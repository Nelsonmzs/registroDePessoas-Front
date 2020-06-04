import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Pessoa } from '../services/pessoa';
import { ConfigService } from '../services/config.service';

@Injectable()
export class PessoaService {

    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;

    constructor(private http: Http, private configService: ConfigService) {

        /** SETANDO A URL DO SERVIÇO REST QUE SERÁ ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/pessoa/';

        /** ADICIONANDO O JSON NO HEADER  */
        this.headers = new Headers({'Content-Type':'application/json;charset=UTF8'});
        this.options = new RequestOptions({headers: this.headers});

    }

    /** CONSULTA TODAS AS PESSOAS CADASTRADAS */
    getPessoas(){
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    /** CONSULTA UM REGISTRO PESSOA */
    getPessoa(codigo:number) {
        return this.http.get(this.baseUrlService + codigo).map(res => res.json());
    }

    /** ADICIONA UMA PESSOA */
    adicionarPessoa(pessoa: Pessoa) {
        return this.http.post(
            this.baseUrlService, 
            JSON.stringify(pessoa), 
            this.options)
            .map(res => res.json());
    }

    /** EXCLUIR UMA PESSOA */
    excluirPessoa(codigo:number) {
        return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
    }

    /** ATUALIZA PESSOA */
    atualizaPessoa(pessoa: Pessoa) {
        return this.http.put(this.baseUrlService, JSON.stringify(pessoa), this.options)
        .map(res => res.json());
    }

}