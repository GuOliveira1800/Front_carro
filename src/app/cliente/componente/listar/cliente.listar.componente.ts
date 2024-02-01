import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Cliente} from '../../modelo/cliente.modelo';
import {ClienteService} from '../../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cliente-root',
  templateUrl: './cliente.listar.componente.html',
  styleUrls: ['./cliente.listar.componente.scss']
})

export class ClienteComponenteListar implements OnInit {
  
  formularioDelete: FormGroup;
  formularioAtualiza: FormGroup;  
  lista: Cliente[];
  
  constructor(private service : ClienteService, private formBuilder: FormBuilder, private router: Router){ }

  ngOnInit() {          
    this.service.list().subscribe(
      dados => this.lista = dados);
         
  }

  ngOnDelete(codigo: number){  
    this.service.deletar(codigo);
    this.router.navigate(['cliente']);
  }

  ngOnAtualizar(codigo: number){
    this.router.navigate(['cliente/atualizar/',codigo])
  }

  onNew(){
    this.router.navigate(['cliente/inserir']);
  }

  title = 'Cliente';
}