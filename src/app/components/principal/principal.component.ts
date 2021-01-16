import { Component, OnInit } from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  alimentos:any=Array();
  alimento:string;
  familias:any=Array();
  platos:any=Array();
  plato:string;
  constructor(private servicio: ApiconexionService) { }

  ngOnInit() {
    this.servicio.getPLatos().subscribe(
      res => {
        this.platos = res;
        this.plato = this.platos[0].foto;
        this.platos.splice(0,1);
      }, error => {
        console.log(error);
      }
    );
    this.servicio.getAliemntos().subscribe(
      res => {
        this.alimentos = res;
        this.alimento = this.alimentos[0].foto;
        this.alimentos.splice(0,1);
      }, error => {
        console.log(error);
      }
    );

  }

}
