import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, catchError, first} from 'rxjs/operators';
import {response} from 'express';
import { Observable, pipe, throwError } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { FormGroup } from '@angular/forms';
import { Pedido } from '../modelo/pedido.modelo';
import { tap, delay, take } from 'rxjs/operators';


@Injectable()
export class PedidoService{
  
  constructor(private http: HttpClient){}

  private readonly API = 'http://localhost:8080/pedido/';

  public salvar(pedido: any){
    return this.http.post(this.API+"inserir",pedido).subscribe(result => console.log(result), error => console.log(error));
  }

  public validarPedido(pedido: any){

    let listaErro = new Array();

    this.http.post(this.API+"validar",pedido).
      subscribe(
          result => 
            listaErro.push(result) , 
          error => 
            console.log(error)
    );

    return listaErro;
  }

  list() {
      return this.http.get<Pedido[]>(this.API+"listar")
      .pipe(            
          tap(next => console.log(next))
      );
  }

  pesquisa(data: any) {    
    return this.http.post<Pedido[]>(this.API+"procura",data);
  }
  
  getCarroById(codigo: number): Observable<Pedido> {
    return this.http.get<Pedido>(this.API+"listar/"+codigo);
  }

  getCarro(pagina:number): Observable<any> {
    return this.http.get(this.API+"listar/pag/"+pagina);
  }

  deletar(codigo: number) {     
    alert(this.API+"deletar/"+codigo)   
      this.http.get(this.API+"deletar/"+codigo).subscribe(
          resultado => {
            console.log('Produto excluído com sucesso.');
          },
          erro => {
            if(erro.status == 404) {
              console.log('Produto não localizado.');
            }
          }
        );
        window.location.href = window.location.href
  }

}