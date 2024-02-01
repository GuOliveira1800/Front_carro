import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm , FormBuilder, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';



import { PesquisaComponent } from '../modalPesquisaCarro/pesquisa.component';
import { PesquisaClienteComponent } from '../modalPesquisaCliente/pesquisa.component';
import { PedidoService } from '../../service/pedido.service';
import { CarroService } from 'src/app/carro/service/carro.service';
import { ClienteService } from 'src/app/cliente/service/cliente.service';

import { Pedido } from '../../modelo/pedido.modelo';
import { Carro } from 'src/app/carro/modelo/carro.modelo';
import { Cliente } from 'src/app/cliente/modelo/cliente.modelo';

@Component({
  selector: 'pedido-root',
  templateUrl: './pedido.inserir.componente.html',
  styleUrls: ['./pedido.inserir.componente.scss']
})

export class PedidoComponenteInserir implements OnInit {
  
  formulario: FormGroup;
  pedido: Pedido;

  listaErro: Array<String>;

  @ViewChild('modeloCarro') modeloCarro : ElementRef;
  @ViewChild('nomeCliente') nomeCliente : ElementRef;

  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
        
  constructor(
    private formBuilder: FormBuilder,
    private service : PedidoService,
    private serviceCarro : CarroService, 
    private serviceCliente : ClienteService, 
    private router: Router, 
    private rota: ActivatedRoute, 
    private dialog?: MatDialog ){}

  ngOnInit() {      

    this.pedido = new Pedido();
    this.listaErro = new Array();

    this.pedido.codcar_ped = new Carro();
    this.pedido.codcli_ped = new Cliente();

    let codigo = this.rota.snapshot.params['id'];

    this.createForm(this.pedido);     

    if(codigo){
      this.service.getCarroById(codigo).subscribe(dados => 
        {      
          this.pedido = dados;
          this.nomeCliente.nativeElement.value = this.pedido.codcli_ped.nome_cli;
          this.modeloCarro.nativeElement.value = this.pedido.codcar_ped.modelo_car;
          this.updateForm(dados);     
        }          
      );       
    }
  }

  pesquisa() {    
    const pedido = new Pedido();
    let carro: Carro;
    const dialogRef = this.dialog.open(PesquisaComponent, {
      data: pedido
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result)
        this.setaCarro(result);

    });
  }

  setaCarro(codigo: number): void{
    this.serviceCarro.getCarroById(codigo).subscribe(
      (response: Carro) => {
        this.pedido.codcar_ped = response;   
        this.updateForm(this.pedido);
        this.modeloCarro.nativeElement.value = this.pedido.codcar_ped.modelo_car;
      }
    )
  }

  pesquisaCliente() {    
    const pedido = new Pedido();
    let carro: Carro;
    const dialogRef = this.dialog.open(PesquisaClienteComponent, {
      data: pedido
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result)
        this.setaCliente(result);

    });
  }

  setaCliente(codigo: number): void{
    this.serviceCliente.getCarroById(codigo).subscribe(
      (response: Cliente) => {
        this.pedido.codcli_ped = response;   
        this.updateForm(this.pedido);
        this.nomeCliente.nativeElement.value = this.pedido.codcli_ped.nome_cli;
        
      }
    )
  }
  
  updateForm(PedidoUnico: Pedido) {

    this.formulario.patchValue({
      codigo_ped: PedidoUnico.codigo_ped,
      status_ped: PedidoUnico.status_ped,
      datdev_ped: ( PedidoUnico.datdev_ped ? PedidoUnico.datdev_ped.substring(8,10) + PedidoUnico.datdev_ped.substring(5,7) + PedidoUnico.datdev_ped.substring(0,4) : "" ),
      datcon_ped: ( PedidoUnico.datcon_ped ? PedidoUnico.datcon_ped.substring(8,10) + PedidoUnico.datcon_ped.substring(5,7) + PedidoUnico.datcon_ped.substring(0,4) : "" ),
      codcar_ped: PedidoUnico.codcar_ped,
      codcli_pes: PedidoUnico.codcli_ped
    });
  }

  createForm(pedido: Pedido) {
    this.formulario = this.formBuilder.group({
      codigo_ped: pedido.codigo_ped,
      status_ped: pedido.status_ped,
      datdev_ped: pedido.datdev_ped,
      datcon_ped: pedido.datdev_ped,
      codcar_ped: pedido.codcar_ped,
      codcli_pes: pedido.codcli_ped
    })
  }

  validarErros(data: any){
    this.listaErro = this.service.validarPedido(data);

    console.log(this.listaErro[0]);

    return false;
  }

  onSubmit(){
    
    if(this.pedido.codcar_ped.codigo_car == 0 || this.pedido.codcli_ped.codigo_cli == 0){       
      return false;
    }

    if (this.pedido.codigo_ped){
      const data = {
        "codigo_ped" : this.pedido.codigo_ped,
        "status_ped" : this.formulario.get("status_ped").value,
        "datcon_ped" : this.formulario.get("datcon_ped").value,
        "datdev_ped" : this.formulario.get("datdev_ped").value,
        "codcar_ped" : this.pedido.codcar_ped.codigo_car,
        "codcli_ped" : this.pedido.codcli_ped.codigo_cli
      }

      if (this.validarErros(data)){
        this.service.salvar(data);
      }
    }else{
      const data = {        
        "status_ped" : this.formulario.get("status_ped").value,
        "datcon_ped" : this.formulario.get("datcon_ped").value,
        "datdev_ped" : this.formulario.get("datdev_ped").value,
        "codcar_ped" : this.pedido.codcar_ped.codigo_car,
        "codcli_ped" : this.pedido.codcli_ped.codigo_cli
      }
  
      if (this.validarErros(data)){
        this.service.salvar(data);
      }
    }
    
    //this.router.navigate(['pedido']);
  }

  title = 'Pedido';
}