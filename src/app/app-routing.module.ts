import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {carroComponenteInserir} from './carro/componente/inserir/carro.inserir.componente';
import {carroComponenteListar} from './carro/componente/listar/carro.listar.componente';

import {ClienteComponenteInserir} from './cliente/componente/inserir/cliente.inserir.componente';
import {ClienteComponenteListar} from './cliente/componente/listar/cliente.listar.componente';

import {PedidoComponenteInserir} from './pedido/componente/inserir/pedido.inserir.componente';
import {PedidoComponenteListar} from './pedido/componente/listar/pedido.listar.componente';

import { geraRelatorio } from './relatorio/componente/listar/relatorio.listar.componente';

const routes: Routes = [
  {path: 'carro/atualizar/:id', component: carroComponenteInserir},
  {path: 'carro/inserir', component: carroComponenteInserir},  
  {path: 'carro', component: carroComponenteListar},

  {path: 'cliente/atualizar/:id', component: ClienteComponenteInserir},
  {path: 'cliente/inserir', component: ClienteComponenteInserir},  
  {path: 'cliente', component: ClienteComponenteListar},

  {path: 'pedido/atualizar/:id', component: PedidoComponenteInserir},
  {path: 'pedido/inserir', component: PedidoComponenteInserir},  
  {path: 'pedido', component: PedidoComponenteListar},
  
  {path: 'relatorio', component: geraRelatorio}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
