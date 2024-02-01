import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgModel } from '@angular/forms';
import {RelatorioService} from '../../service/relatorio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'relatorio-root',
  templateUrl: './relatorio.listar.componente.html',
  styleUrls: ['./relatorio.listar.componente.scss']
})

export class geraRelatorio implements OnInit {
  
  formulario: FormGroup;  
  folder: String;
  
  constructor(private service : RelatorioService, private formBuilder: FormBuilder, private router: Router){ }

  ngOnInit() {          
    
    this.formulario = this.formBuilder.group({
      dataDe: Date,
      dataAte: Date,      
    });

  }

  onSubmit(){    
    this.service.gerar(this.formulario.value).subscribe(
      result => {
        document.getElementById("iframe").setAttribute("src","data:application/pdf;base64," + result.pdf);
      }
    );
  }

  title = 'Carro';
}