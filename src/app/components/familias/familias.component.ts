import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Familia} from "../../models/Familia";
import {ApiconexionService} from "../../services/apiconexion.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.css']
})
export class FamiliasComponent implements OnInit {

  @HostBinding('class') classes = 'row';
familias:Familia[] = [];
  constructor(private servicio:ApiconexionService, private toast:ToastrService) { }

  ngOnInit() {
  this.servicio.getFamilias().subscribe(
    (res:Familia[]) => {
     this.familias = res;
    },error => {
      console.log('Error al traerse las familias');
    }
  )}

  eliminaFamilia(id:number,indice:number){
    this.servicio.deleteFamilias(id).subscribe(
      res => {
        this.familias.splice(indice,1);
        this.toast.warning('Producto Eliminado','Eliminado');
      }
    );

  }

}
