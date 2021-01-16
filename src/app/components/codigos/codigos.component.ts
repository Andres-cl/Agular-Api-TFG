import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";
import {ActivatedRoute} from "@angular/router";
import {Codigo} from "../../models/Codigo";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-codigos',
  templateUrl: './codigos.component.html',
  styleUrls: ['./codigos.component.css']
})
export class CodigosComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  codigos:Codigo[] = [];

  constructor(private servicio:ApiconexionService, private toast : ToastrService) { }

  ngOnInit() {
    this.servicio.getCodigos().subscribe(
      (res:Codigo[]) => {
        this.codigos = res;
      },error => {
        console.log('Error al traerse los alimentos');
      }
    );
  }

  deleteCodigoo(id:string,indice:number){
    this.servicio.deleteCodigo(Number(id)).subscribe(
      res => {
        this.codigos.splice(indice,1);
        this.toast.warning('Alimento Eliminado','Eliminado');
      }
    );
  }
  getFecha(codigo:Codigo){
    var fecha =new Date(codigo.validez);
    return fecha.toLocaleDateString();
  }


}
