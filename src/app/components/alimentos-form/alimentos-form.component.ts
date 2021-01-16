import { Component, OnInit } from '@angular/core';
import {Alimento} from "../../models/Alimento";
import {ApiconexionService} from "../../services/apiconexion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import * as $ from 'jquery';

@Component({
  selector: 'app-alimentos-form',
  templateUrl: './alimentos-form.component.html',
  styleUrls: ['./alimentos-form.component.css']
})
export class AlimentosFormComponent implements OnInit {

edit:boolean = false;
id:string;
alertaExtra:boolean;
tipos:String[]=['Carbohidratos','Proteinas','Verduras','extras'];
alimento: Alimento ={
  id:0,
  precio: null,
  foto:'',
  nombre:'',
  proteinas: null,
  grasas: null,
  hidratos: null,
  calorias: null,
  tipoalimento: ''
};

  constructor(private servicio: ApiconexionService, private rutaActiva:ActivatedRoute,private router:Router,private toast:ToastrService) {
    this.alertaExtra = false;
  }

  ngOnInit() {

    this.id = this.rutaActiva.snapshot.paramMap.get('id');
    if (this.id != null){
      this.edit = true;
      this.servicio.getAliemnto(this.id).subscribe(
        res => {
          this.alimento = res;
        },error => {
          console.error(error);
        }
      )
    }
  }


  saveAliemnto(){
    if (this.alimento.tipoalimento === 'extras'){
      this.alertaExtra = !Number.isInteger(Number(this.alimento.nombre.split(' ').reverse()[1])) || this.alimento.nombre.split(' ').reverse()[0] != 'Gr';
    }
    if (!this.alertaExtra) {
      delete this.alimento.id;
      this.servicio.postAlimento(this.alimento).subscribe(
        res => {
          this.toast.success('Alimento añadido con éxito','Completado');
          this.router.navigate(['/alimentos']);
        }
      )
    }else{
      this.toast.error('Campo nombre erroneo');
    }
  }
  updateAlimento(){
    if (this.alimento.tipoalimento === 'extras'){
      this.alertaExtra = !Number.isInteger(Number(this.alimento.nombre.split(' ').reverse()[1])) || this.alimento.nombre.split(' ').reverse()[0] != 'Gr';
    }
    if (!this.alertaExtra) {
      this.servicio.updateAlimentos(this.id, this.alimento).subscribe(
        res => {
          this.toast.info('Alimento Modificado','Completado');
          this.router.navigate(['/alimentos']);
        }
      )
    }
  }
}

