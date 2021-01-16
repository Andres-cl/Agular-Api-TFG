import {Component, HostBinding, OnInit} from '@angular/core';
import {ApiconexionService} from "../../services/apiconexion.service";
import {Faq} from "../../models/faq";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  preguntas:Faq[] = [];
  constructor(private servicio:ApiconexionService,private toast:ToastrService) { }

  ngOnInit() {
    this.cargaPreguntas();
    console.log(this.preguntas);
  }

    cargaPreguntas(){
      this.servicio.getPreguntas().subscribe(
        (res:Faq[]) => {
          this.preguntas = res;
        }
      )
    }
  eliminaFamilia(id:number, indice:number){
    this.servicio.deletePregunta(String(id)).subscribe(
      res => {
        this.preguntas.splice(indice,1);
        this.toast.warning('Alimento Eliminado','Eliminado');
      }
    );

  }

}
