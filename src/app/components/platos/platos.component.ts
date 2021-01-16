import {Component, HostBinding, OnInit} from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";
import {Plato} from "../../models/Plato";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  platos:Plato[] = [];
  constructor(private servicio:ApiconexionService, private toast:ToastrService) { }

  ngOnInit() {
    this.servicio.getPLatos().subscribe(
      (res:Plato[]) => {
        this.platos = res;
      },error => {
        console.log('Error al traerse los platos');
      }
    );
  }
  deletePlato(id:string,indice:number){
    this.servicio.deletePlatos(id).subscribe(
      res => {
        this.platos.splice(indice,1);
        this.toast.warning('Plato Eliminado','Eliminado');
      }
    );
  }

}
