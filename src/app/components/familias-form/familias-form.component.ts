import { Component, OnInit } from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Familia} from "../../models/Familia";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-familias-form',
  templateUrl: './familias-form.component.html',
  styleUrls: ['./familias-form.component.css']
})
export class FamiliasFormComponent implements OnInit {
edit: boolean = false;
id:string = '';
familia: Familia ={
  id: 0,
  nombre: '',
  descripcion:''
};
  constructor(private servicio: ApiconexionService, private rutaActiva:ActivatedRoute,private router:Router, private toast:ToastrService) { }

  ngOnInit() {
  this.id = this.rutaActiva.snapshot.paramMap.get('id');
  console.log(this.id);
  if (this.id != null){
    this.edit = true;
    this.servicio.getFamilia(this.id).subscribe(
      res => {
        this.familia = res;
      }
    )}
  }
  saveFamilia(){
    delete this.familia.id;
    this.servicio.postFamilias(this.familia).subscribe(
      res => {
        this.toast.success('Producto añadido con éxito','Completado');
        this.router.navigate(['/familias']);
      }, error => {
        console.error(error);
      }
    )
  }
  updateFamilia(){
    this.servicio.updateFamilias(this.id,this.familia).subscribe(
      res => {
        this.toast.info('Producto Modificado','Completado');
        this.router.navigate(['/familias']);
      }, error => {
        console.error(error);
      }
    )
  }
}
