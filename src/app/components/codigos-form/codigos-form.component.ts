import { Component, OnInit } from '@angular/core';
import {Codigo} from "../../models/Codigo";
import {ApiconexionService} from "../../services/apiconexion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-codigos-form',
  templateUrl: './codigos-form.component.html',
  styleUrls: ['./codigos-form.component.css']
})
export class CodigosFormComponent implements OnInit {
  edit:boolean = false;
  id:string;
  descuentos:number[]=[5,10,15,20,25,30,35,40];
  codigo:Codigo = {
    id:0,
    descuento:0,
    preciominimo:null,
    codigo:'',
    validez:null
  };
  fecha;
  constructor(private servicio: ApiconexionService, private rutaActiva:ActivatedRoute,private router:Router, private toast:ToastrService) { }
  ngOnInit() {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');
    if (this.id != null){
      this.edit = true;
      console.log('Trayendo info de codigo: ', this.id);
      this.servicio.getCodigo(Number(this.id)).subscribe(
        res => {
          this.codigo = res;
        },error => {
          console.error(error);
        }
      )
    }
  }
  getFecha(){
    var fecha =new Date(this.codigo.validez);
    return fecha.toLocaleDateString();
  }
  saveCodigo(){
    this.servicio.postCodigo(this.codigo).subscribe(
      res => {
        this.toast.success('Alimento añadido con éxito','Completado');
        this.router.navigate(['/codigos']);
      }
    )
  }
  updateCodigo(){
    if (this.codigo.validez != null){
      this.codigo.validez = new Date(this.codigo.validez).toLocaleDateString().split('/').reverse().join('-');
    }
    this.servicio.updateCodigo(this.id,this.codigo).subscribe(
      res => {
        this.toast.info('Alimento Modificado','Completado');
        this.router.navigate(['/codigos']);
      }
    )
  }

}
