import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Relatorio} from '../modelo/relatorio';
import { Observable } from 'rxjs';

@Injectable()
export class RelatorioService{
  
  constructor(private http: HttpClient){}

  private readonly API = 'http://localhost:8080/relatorio/';

  public gerar(data: any): Observable<Relatorio>{
    return this.http.post<Relatorio>(this.API+"pdf",data);
  }

}