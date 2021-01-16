import { Component, OnInit } from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";
import {ActivatedRoute} from "@angular/router";
import {DietaPersonal} from "../../models/DietaPersonal";
import {Usuario} from "../../models/Usuario";
import {Alimento} from "../../models/Alimento";
import {error} from "util";
import {Plato} from "../../models/Plato";

@Component({
  selector: 'app-plan-personal-info',
  templateUrl: './plan-personal-info.component.html',
  styleUrls: ['./plan-personal-info.component.css']
})
export class PlanPersonalInfoComponent implements OnInit {

  private idPlan;
  private plan : DietaPersonal;
  private solicitante : Usuario;
  private alimentosIndeseados:Alimento [];
  private platosIndeseados:Plato [];
  constructor(private servicio:ApiconexionService, private activa:ActivatedRoute) {
    this.plan = {}; this.solicitante = {};
    this.alimentosIndeseados = [];
    this.platosIndeseados = [];
  }

  async ngOnInit() {
  this.idPlan = this.activa.snapshot.paramMap.get('id');
    this.cargaInfoSolicitud();
  await this.cargaAlimentos();
  console.log(this.alimentosIndeseados);
  }
  cargaInfoSolicitud(){
    this.servicio.getDietaPersonal(this.idPlan).subscribe(
      (res:DietaPersonal) => {
        this.plan = res;
        this.servicio.getUser(this.plan.usuarioId).subscribe(
          (res:Usuario) => {
            this.solicitante = res;
            console.log('solicitantee y solicitud: ', this.solicitante, this.plan);
          }, error => {console.error(error)}
        )
      }, error => {console.error(error)}
    );
  }
  async cargaAlimentos(){
    let alimentos:any = await this.servicio.getAlimentosIndeseadosDieta(this.idPlan).toPromise().catch(error => {console.error(error)});
    console.log(alimentos);
    if (alimentos != null) {
      for (let alimento of alimentos) {
        let ali : any;
        if (alimento.alimentoId != null) {
          ali = await this.servicio.getAliemnto(alimento.alimentoId).toPromise().catch(error => {
            console.error(error)
          });
          this.alimentosIndeseados.push(ali);
        }
        else{
          ali = await this.servicio.getPlato(alimento.platoId).toPromise().catch(error => {
            console.error(error)
          });
          this.platosIndeseados.push(ali);
        }
      }
    }
  }


}
