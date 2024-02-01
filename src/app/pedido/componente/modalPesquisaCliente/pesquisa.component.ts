import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { Pedido } from '../../modelo/pedido.modelo';
import { Cliente } from '../../../cliente/modelo/cliente.modelo';
import { ClienteService } from '../../../cliente/service/cliente.service';

@Component({
  selector: 'pesquisa-cliente-root',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})

export class PesquisaClienteComponent implements OnInit {

  public _contactForm: FormGroup;
  lista: Cliente[];
  protected _codigoSelecionado: number;

  constructor(private _formBuilder: FormBuilder, private service : ClienteService, 
  private dialogRef: MatDialogRef<PesquisaClienteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Pedido) { }

    setaCodigo(codigo: number): void{
        this._codigoSelecionado = codigo;        
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.service.listaVerificados().subscribe(
            dados => this.lista = dados
        );
    }

    selecionar(){
        this.dialogRef.close(this._codigoSelecionado);        
    }

    cancelar(){
        this.dialogRef.close();        
    }

    onSubmit() {
        this.dialogRef.close();
    }

}