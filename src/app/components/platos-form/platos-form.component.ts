import { Component, OnInit } from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Plato} from "../../models/Plato";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-platos-form',
  templateUrl: './platos-form.component.html',
  styleUrls: ['./platos-form.component.css']
})
export class PlatosFormComponent implements OnInit {
  edit:boolean = false;
  id:string;
  plato:Plato = {
    id:0,
  nombre:'',
  descripcion : '',
  foto: '' ,
  precio : null,
  proteinas: null,
  grasas: null,
  hidratos: null,
  calorias: null,
  familiaid: null,
  tipoplato: ''
  };
  tipos : string[] = ['Desayunos','Comidas','Cenas'];
  constructor(private servicio: ApiconexionService, private rutaActiva:ActivatedRoute,private router:Router,private toast:ToastrService) { }

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');
    if (this.id != null){
      this.edit = true;
      this.servicio.getPlato(this.id).subscribe(
        res => {
          this.plato = res;
        },
        error => console.log(error)
      )
    }
  }
  savePlato(){
    this.plato.familiaid = 1;
    delete this.plato.id;
    this.servicio.postPlato(this.plato).subscribe(
      res => {
        this.toast.success('Plato añadido con éxito','Completado');
        this.router.navigate(['/platos']);
      },error => console.error(error)
    )
  }
  updatePlato(){
    console.log('modificandi');
    this.plato.familiaid = 1;
    this.servicio.updatePlato(this.id,this.plato).subscribe(
      res => {
        this.toast.info('Alimento Modificado','Completado');
        this.router.navigate(['/platos']);
      }, error => console.error(error)
    )
  }

}
