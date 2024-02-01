import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, catchError, first} from 'rxjs/operators';
import {response} from 'express';
import { Observable, pipe, throwError } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { FormGroup } from '@angular/forms';
import { Cliente } from '../modelo/cliente.modelo';
import { tap, delay, take } from 'rxjs/operators';


@Injectable()
export class ClienteService{
  
  constructor(private http: HttpClient){}

  private readonly API = 'http://localhost:8080/cliente/';

  public salvar(cliente: Cliente){
    console.log(Cliente);
    if(cliente.codigo_cli){
      return this.http.post<Cliente>(this.API+"atualizar",cliente).subscribe(result => console.log(result), error => console.log(error));
    }else{
      return this.http.post<Cliente>(this.API+"inserir",cliente).subscribe(result => console.log(result), error => console.log(error));
    }
  }

  list() {
      return this.http.get<Cliente[]>(this.API+"listar")
      .pipe(            
          tap(console.log)
      );
  }

  listaVerificados() {
    return this.http.get<Cliente[]>(this.API+"listar/verificado")
    .pipe(            
        tap(console.log)
    );
}
      
  getCarroById(codigo: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.API+"listar/"+codigo);
  }

  deletar(codigo: number) {        
      this.http.delete(this.API+"deletar/"+codigo).subscribe(
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