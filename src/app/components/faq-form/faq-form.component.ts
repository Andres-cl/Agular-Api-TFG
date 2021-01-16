import { Component, OnInit } from '@angular/core';
import {Familia} from "../../models/Familia";
import {ApiconexionService} from "../../services/apiconexion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Faq} from "../../models/faq";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent implements OnInit {
  edit: boolean = false;
  id:string = '';
  pregunta: Faq ={
    id: 0,
    pregunta: '',
    respuesta:''
  };
  constructor(private servicio: ApiconexionService, private rutaActiva:ActivatedRoute,private router:Router,private toast:ToastrService) { }

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');
    if (this.id != null){
      this.edit = true;
      this.servicio.getPregunta(this.id).subscribe(
        res => {
          this.pregunta = res;
        }
      )}
  }
  savePregunta(){
    delete this.pregunta.id;
    this.servicio.postPregunta(this.pregunta).subscribe(
      res => {
        this.toast.success('Pregunta añadida con éxito','Completado');
        this.router.navigate(['/faq']);
      }, error => {
        console.error(error);
      }
    )
  }
  updatePregunta(){
    this.servicio.updatePregunta(this.id,this.pregunta).subscribe(
      res => {
        this.toast.info('Pregunta Modificada','Completado');
        this.router.navigate(['/faq']);
      }, error => {
        console.error(error);
      }
    )
  }
}
