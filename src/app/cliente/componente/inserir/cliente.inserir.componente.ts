import { Component, OnInit } from '@angular/core';
import { NgForm , FormBuilder, FormGroup } from '@angular/forms';
import {Cliente} from '../../modelo/cliente.modelo';
import {ClienteService} from '../../service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from '../../modelo/endereco.modelo';


@Component({
  selector: 'cliente-root',
  templateUrl: './cliente.inserir.componente.html',
  styleUrls: ['./cliente.inserir.componente.scss']
})

export class ClienteComponenteInserir implements OnInit {
  
  formulario: FormGroup;
  cliente: Cliente;
        
  constructor(private formBuilder: FormBuilder,private service : ClienteService, private router: Router, private rota: ActivatedRoute){}

  ngOnInit() {      

    this.cliente = new Cliente();

    this.cliente.codend_cli = new Endereco();

    let codigo = this.rota.snapshot.params['id'];

    this.createForm(this.cliente);     

    if(codigo){
      this.service.getCarroById(codigo).subscribe(dados => 
        {          
          this.updateForm(dados);     
        }          
      );       
    }
  }
  
  updateForm(clienteUnico: Cliente) {
    console.log(clienteUnico.codend_cli.cep_end);
    this.formulario.patchValue({
      codigo_cli: clienteUnico.codigo_cli,
      nome_cli: clienteUnico.nome_cli,
      docume_cli: clienteUnico.docume_cli,
      telefo_cli: clienteUnico.telefo_cli,
      cep_end: clienteUnico.codend_cli.cep_end ,
      numero_end: clienteUnico.codend_cli.numero_end,
      verifi_cli: clienteUnico.verifi_cli,
      codend_cli: clienteUnico.codend_cli
    });
  }

  createForm(cliente: Cliente) {
    this.formulario = this.formBuilder.group({
      codigo_cli: cliente.codigo_cli,
      nome_cli: cliente.nome_cli,
      docume_cli: cliente.docume_cli,
      telefo_cli: cliente.telefo_cli,
      cep_end: cliente.codend_cli.cep_end,
      numero_end: cliente.codend_cli.numero_end,
      verifi_cli: cliente.verifi_cli,
      codend_cli: cliente.codend_cli
    })
  }

  onSubmit(){
    console.log(this.formulario.value);
    this.service.salvar(this.formulario.value);
    this.router.navigate(['cliente']);
  }

  title = 'Cliente';
}