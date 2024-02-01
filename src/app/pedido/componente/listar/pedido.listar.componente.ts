import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {PedidoService} from '../../service/pedido.service';
import { Pedido } from '../../modelo/pedido.modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'pedido-root',
  templateUrl: './pedido.listar.componente.html',
  styleUrls: ['./pedido.listar.componente.scss']
})

export class PedidoComponenteListar implements OnInit {
  
  formularioDelete: FormGroup;
  formularioAtualiza: FormGroup;  

  formularioPesquisa: FormGroup;

  lista: Pedido[];
  listaTeste: Pedido[];
  pedido: Pedido;

  paginaTotal: number;
  paginaAtual: number;
  
  constructor(private service : PedidoService, private formBuilder: FormBuilder, private router: Router){ }

  ngOnInit() {          
    this.service.list().subscribe(
      dados => {
        this.lista = dados
      });
    
      this.iniciaListagem();
      this.createForm();
  }

  createForm() {
    this.formularioPesquisa = this.formBuilder.group({
      nome_cli: "",
      modelo_car: ""
    })
  }

  iniciaListagem(){
    this.listaTeste = new Array();

    this.service.getCarro(0).subscribe(
      dados => {
        dados.content.forEach(value =>{            
            this.pedido = new Pedido();

            this.pedido.codcar_ped = value.codcar_ped;
            this.pedido.codcli_ped = value.codcli_ped;
            this.pedido.codigo_ped = value.codigo_ped;
            this.pedido.datcon_ped = this.formataData(value.datcon_ped);
            this.pedido.datdev_ped = this.formataData(value.datdev_ped);
            this.pedido.status_ped = value.status_ped;

            this.listaTeste.push(this.pedido);
          
        });

        this.paginaAtual = dados.number;

        this.paginaTotal = dados.totalPages - 1;

      }
    );
  }

  getPagina(proximo: Boolean){

    if(proximo){
      if(this.paginaAtual == this.paginaTotal){
        return ;
      }
      this.paginaAtual = this.paginaAtual + 1;
    }else{
      if(this.paginaAtual == 0){
        return ;
      }
      this.paginaAtual = this.paginaAtual - 1;
    }
 
    this.listaTeste = new Array();

    this.service.getCarro(this.paginaAtual).subscribe(
      dados => {
        dados.content.forEach(value =>{            
            this.pedido = new Pedido();

            this.pedido.codcar_ped = value.codcar_ped;
            this.pedido.codcli_ped = value.codcli_ped;
            this.pedido.codigo_ped = value.codigo_ped;
            this.pedido.datcon_ped = this.formataData(value.datcon_ped);
            this.pedido.datdev_ped = this.formataData(value.datdev_ped);
            this.pedido.status_ped = value.status_ped;

            this.listaTeste.push(this.pedido);
          
        });

        this.paginaAtual = dados.number;

        this.paginaTotal = dados.totalPages - 1;

      }
    );
  }

  getTextoPagina(){
    return "Pagina " + (this.paginaAtual + 1) + " de " + (this.paginaTotal + 1);
  }

  public formataData(data: String){
    return data.substring(8,10)+"/"+data.substring(5,7)+"/"+data.substring(0,4)
  }

  getStatusFormatado(status: number) : string {

    switch(status){
      case 1:
        return 'Aberto';      
      case 2:
        return 'Em Andamento';
      case 3:
        return 'Cancelado';
    }

    return '';
  }

  pesquisa(){

    this.listaTeste = new Array();

    this.service.pesquisa(this.formularioPesquisa.value).subscribe(
      dados => {
        dados.forEach(value =>{      

          this.pedido = new Pedido();

          let testeData : Date = new Date(value.datcon_ped);

          this.pedido.codcar_ped = value.codcar_ped;
          this.pedido.codcli_ped = value.codcli_ped;
          this.pedido.codigo_ped = value.codigo_ped;
          this.pedido.datcon_ped = this.formataData(value.datcon_ped);
          this.pedido.datdev_ped = this.formataData(value.datdev_ped);
          this.pedido.status_ped = value.status_ped;

          this.listaTeste.push(this.pedido);
          
        })
      }
    );
  }

  limpar(){
    this.iniciaListagem();
    this.formularioPesquisa.patchValue({
      nome_cli: "",
      modelo_car: ""
    });
  }

  ngOnDelete(codigo: number){  
    this.service.deletar(codigo);
    this.router.navigate(['pedido']);
  }

  ngOnAtualizar(codigo: number){
    this.router.navigate(['pedido/atualizar/',codigo])
  }

  onNew(){
    this.router.navigate(['pedido/inserir']);
  }

  title = 'Pedido';
}