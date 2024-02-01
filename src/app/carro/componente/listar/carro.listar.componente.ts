import { Component, OnInit } from '@angular/core';
import { NgForm , FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {Carro} from '../../modelo/carro.modelo';
import {CarroService} from '../../service/carro.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'carro-root',
  templateUrl: './carro.listar.componente.html',
  styleUrls: ['./carro.listar.componente.scss']
})

export class carroComponenteListar implements OnInit {
  
  formularioDelete: FormGroup;
  formularioAtualiza: FormGroup;  
  lista: Carro[];
  
  constructor(private service : CarroService, private formBuilder: FormBuilder, private router: Router){ }

  ngOnInit() {          
    this.service.list().subscribe(
      dados => this.lista = dados);
         
  }

  ngOnDelete(codigo: number){  
    this.service.deletar(codigo);
    this.router.navigate(['carro']);
  }

  ngOnAtualizar(codigo: number){
    this.router.navigate(['carro/atualizar/',codigo])
  }

  onNew(){
    this.router.navigate(['carro/inserir']);
  }

  title = 'Carro';
}