import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carro } from '../modelo/carro.modelo';
import { tap } from 'rxjs/operators';


@Injectable()
export class CarroService{
  
  constructor(private http: HttpClient){}

  private readonly API = 'http://localhost:8080/carro/';

  public salvar(carro: Carro){
    if(carro.codigo_car){
      return this.http.post<Carro>(this.API+"atualizar",carro).subscribe(result => console.log(result), error => console.log(error));
    }else{
      return this.http.post<Carro>(this.API+"inserir",carro).subscribe(result => console.log(result), error => console.log(error));
    }
  }

  list() {
      return this.http.get<Carro[]>(this.API+"listar")
      .pipe(            
          tap(console.log)
      );
  }

  listaPorStatus(status: number) {
    return this.http.get<Carro[]>(this.API+"listar/status/"+status)
    .pipe(            
        tap(console.log)
    );
}
      
  getCarroById(codigo: number): Observable<Carro> {
    return this.http.get<Carro>(this.API+"listar/"+codigo);
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