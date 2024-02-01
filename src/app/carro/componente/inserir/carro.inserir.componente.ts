import { Component, OnInit } from '@angular/core';
import { NgForm , FormBuilder, FormGroup } from '@angular/forms';
import {Carro} from '../../modelo/carro.modelo';
import {CarroService} from '../../service/carro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'carro-root',
  templateUrl: './carro.inserir.componente.html',
  styleUrls: ['./carro.inserir.componente.scss']
})

export class carroComponenteInserir implements OnInit {
  
  formulario: FormGroup;
  carro: Carro;
        
  constructor(private formBuilder: FormBuilder,private service : CarroService, private router: Router, private rota: ActivatedRoute){}

  ngOnInit() {      

    this.carro = new Carro();

    let codigo = this.rota.snapshot.params['id'];

    this.createForm(this.carro);     

    if(codigo){
      this.service.getCarroById(codigo).subscribe(dados => 
        {          
          this.updateForm(dados);     
        }          
      );       
    }
  }
  
  updateForm(carroUnico: Carro) {
    this.formulario.patchValue({
      codigo_car: carroUnico.codigo_car,
      modelo_car: carroUnico.modelo_car,
      marca_car: carroUnico.marca_car,
      status_car: carroUnico.status_car,
      ano_car: carroUnico.ano_car,
      categoria_car: carroUnico.categoria_car,
      preco_car: carroUnico.preco_car
    });
  }

  createForm(carro: Carro) {
    this.formulario = this.formBuilder.group({
        codigo_car: [carro.codigo_car],
        modelo_car: [carro.modelo_car],
        marca_car: [carro.marca_car],
        status_car: [carro.status_car],
        ano_car: [carro.ano_car],
        categoria_car: [carro.categoria_car],
        preco_car: [carro.preco_car]
    })
  }

  onSubmit(){
    this.service.salvar(this.formulario.value);
    this.router.navigate(['carro']);
  }

  title = 'Carro';
}