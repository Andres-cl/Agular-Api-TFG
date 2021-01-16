import {Component, HostBinding, OnInit} from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";
import {ToastrService} from "ngx-toastr";
import {Alimento} from "../../models/Alimento";

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  alimentos:Alimento[] = [];
  constructor(private servicio:ApiconexionService, private toast:ToastrService) { }

  ngOnInit() {
    this.servicio.getAliemntos().subscribe(
      (res:Alimento[]) => {
        this.alimentos = res;
        console.log(this.alimentos)
      },error => {
        console.log('Error al traerse los alimentos');
      }
    );
  }
  deleteAlimento(id:string, indice:number){
    this.servicio.deleteAlimentos(id).subscribe(
      res => {
        this.toast.warning('Alimento Eliminado','Eliminado');
        this.alimentos.splice(indice,1);
      }
    );
  }


}
