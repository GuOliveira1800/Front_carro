import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { carroComponenteInserir } from './carro/componente/inserir/carro.inserir.componente';
import { carroComponenteListar } from './carro/componente/listar/carro.listar.componente';

import { ClienteComponenteInserir } from './cliente/componente/inserir/cliente.inserir.componente';
import { ClienteComponenteListar } from './cliente/componente/listar/cliente.listar.componente';

import { PedidoComponenteInserir } from './pedido/componente/inserir/pedido.inserir.componente';
import { PedidoComponenteListar } from './pedido/componente/listar/pedido.listar.componente';

import { NgxMaskModule } from 'ngx-mask';

import { ReactiveFormsModule } from '@angular/forms';

import { CarroService } from './carro/service/carro.service';
import { ClienteService } from './cliente/service/cliente.service';
import { PedidoService } from './pedido/service/pedido.service';
import { RelatorioService } from './relatorio/service/relatorio.service';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PesquisaComponent } from './pedido/componente/modalPesquisaCarro/pesquisa.component';
import { PesquisaClienteComponent } from './pedido/componente/modalPesquisaCliente/pesquisa.component';
import { geraRelatorio } from './relatorio/componente/listar/relatorio.listar.componente';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    carroComponenteInserir,
    carroComponenteListar,
    ClienteComponenteInserir,
    ClienteComponenteListar,
    PedidoComponenteInserir,
    PedidoComponenteListar,
    PesquisaComponent,
    PesquisaClienteComponent,
    geraRelatorio
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    FormsModule
  ],
  providers: [
    CarroService,
    ClienteService,
    PedidoService,
    RelatorioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
