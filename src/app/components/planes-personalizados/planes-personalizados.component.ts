import {Component, HostBinding, OnInit} from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";
import {DietaPersonal} from "../../models/DietaPersonal";
import {AuthServiceService} from "../../services/auth-service.service";
import {DialogService} from "../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {Usuario} from "../../models/Usuario";

@Component({
  selector: 'app-planes-personalizados',
  templateUrl: './planes-personalizados.component.html',
  styleUrls: ['./planes-personalizados.component.css']
})
export class PlanesPersonalizadosComponent implements OnInit {
  @HostBinding('class') classes = 'row';
dietasPersonales:DietaPersonal[] = [];
  constructor(private servicio:ApiconexionService, private authService:AuthServiceService,private dialogService:DialogService, private toast:ToastrService) { }

  ngOnInit() {
    this.cargaDietas();
  }
  cargaDietas(){
    this.servicio.getDietasPersonales().subscribe(
      (res:DietaPersonal[]) => {
        this.dietasPersonales = res;
        console.log('dietasPersonales ',this.dietasPersonales);
      },error => {console.log(error)}
    )
  }
  async deletePlanPersonal(solicitud:DietaPersonal, i:number){
    this.dialogService.openConfirmDialog('¿Vas a eliminar un plan sin haberlo completado, estas seguro??').afterClosed().subscribe(
      res => {
        if (res){

          this.servicio.deleteDietaPersonal(solicitud.id).subscribe(
            res => {
                this.toast.warning('Solicitud de dieta eliminada');
                this.dietasPersonales.splice(i,1);
              this.servicio.getUser(solicitud.usuarioId).subscribe(
                (res:Usuario) => {
                  let variables = {nombre:res.nombre};
                  this.servicio.mandaEmail(res.correo,'Actualizacion Plan personal','plansemanalcancel',variables);
                }
              );
            }, error => {}
          )
        }
      },error => {console.log('error')}
    )

  }

}
