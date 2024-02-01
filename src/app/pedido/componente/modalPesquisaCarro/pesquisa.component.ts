import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { Pedido } from '../../modelo/pedido.modelo';
import { CarroService } from 'src/app/carro/service/carro.service';
import { Carro } from 'src/app/carro/modelo/carro.modelo';

@Component({
  selector: 'pesquisa-root',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})

export class PesquisaComponent implements OnInit {

  public _contactForm: FormGroup;
  lista: Carro[];
  protected _codigoSelecionado: number;

  constructor(private _formBuilder: FormBuilder, private service : CarroService, 
  private dialogRef: MatDialogRef<PesquisaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Pedido) { }

    setaCodigo(codigo: number): void{
        this._codigoSelecionado = codigo;        
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.service.listaPorStatus(1).subscribe(
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