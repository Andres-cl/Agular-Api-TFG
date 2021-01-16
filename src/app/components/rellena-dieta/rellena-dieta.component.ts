import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Plato} from "../../models/Plato";
import {ApiconexionService} from "../../services/apiconexion.service";
import {Alimento} from "../../models/Alimento";
import {Nutricional} from "../../models/Nutricional";
import {HuecoPlanSemanal} from "../../models/HuecoPlanSemanal";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Usuario} from "../../models/Usuario";
import {core} from "@angular/compiler";

@Component({
  selector: 'app-rellena-dieta',
  templateUrl: './rellena-dieta.component.html',
  styleUrls: ['./rellena-dieta.component.css']
})
export class RellenaDietaComponent implements OnInit {

  private rellena:boolean = false; //Gestion de añadir nuevo elemento al plan
  private indice:number;

  private huecosPlan:HuecoPlanSemanal[]; //Gestion del plan
  private fotosPlan: string[];
  private nutricionPlan : Nutricional[] = Array(5);
  private precioPlan:number;
  private loading2:boolean  = false;
  private usuarioId:Usuario;
  private solicitudId:number;
  private alimentosNoDeseados: any;
  private infoDia: number;

  private platos: Plato[]=[]; //gestion de un nuevo plato
  private platoSeleccionado:Plato = {};

  private proteinas : Alimento[] = [];  //gestion de un nuevo tupper
  private carbohidratos : Alimento[] = [];
  private verduras : Alimento[] = [];
  private extras : Alimento[] = [];
  private extraList : any = [];
  private extrasTupper : Alimento[] = [];
  private alimentosBase : any[] = Array(3);
  private alimentosTupper : any[] = [];
  private nutricionalesTupper : Nutricional;
  private loading = false;
  private drowDown = {idField : 'id', textField:'nombre', limitSelection:3};


  constructor(private servicio:ApiconexionService, private activa:ActivatedRoute, private router:Router, private toast:ToastrService) {
    this.huecosPlan = Array(15);
    this.fotosPlan = Array(15);
    this.alimentosBase[0] = {};
    this.alimentosBase[1] = {};
    this.alimentosBase[2] = {};
    this.infoDia = -1;
  }

  ngOnInit() {
    this.getUser();
    this.solicitudId = Number(this.activa.snapshot.paramMap.get('idSolicitud'));
    this.iniciaNutricionales();
    this.cargaAlimentos();
    this.getPlatos();
    this.getNoDeseados();
  }
  isValidOption(tipo:string,id:number){
    for (const al of this.alimentosNoDeseados) {
      if ((tipo === 'plato' && al.platoId === id) || (tipo === 'alimento' && al.alimentoId === id))
        return true;
    }
      return false;
    }

  getNoDeseados(){
    this.servicio.getAlimentosIndeseadosDieta(this.solicitudId).subscribe(
      res => {
        this.alimentosNoDeseados = res;
        console.log(this.alimentosNoDeseados);
      },error => {console.log(error)}
    )
  }
  getPlatos(){
    this.servicio.getPLatos().subscribe(
      (res:Plato[]) => {
        this.platos=res;
      }, error => {console.log(error)}
    )
  }
  getUser(){
    let id = Number(this.activa.snapshot.paramMap.get('idUser'));
    this.servicio.getUser(id).subscribe((res:Usuario) => {this.usuarioId = res},
        error1 => {console.log(error1)})
  }
  abrirInfoNutricion(index:number){
    if (this.infoDia === index)
      this.infoDia = -1;
    else
      this.infoDia = index;
  }

  planValido(){
    let contador = 0;
    this.huecosPlan.forEach((x) => {
      contador++;
    });
    return contador === 15;
  }
  iniciaNutricionales(){
    this.nutricionPlan = [
      {calorias: 0, proteinas: 0, hidratos: 0, grasas: 0},
      {calorias: 0, proteinas: 0, hidratos: 0, grasas: 0},
      {calorias: 0, proteinas: 0, hidratos: 0, grasas: 0},
      {calorias: 0, proteinas: 0, hidratos: 0, grasas: 0},
      {calorias: 0, proteinas: 0, hidratos: 0, grasas: 0}
      ];
  }
  getDia(dia:number){
    switch (dia) {
      case 1: return 'Lunes';
      case 2: return 'Martes';
      case 3: return 'Miercoles';
      case 4: return 'Jueves';
      case 5: return 'Viernes';
    }
  }
  getIndex(row: number, col: number) {
    switch (row) {
      case 0:
        return row + col;
      case 1:
        col += 4;
        return row + col;
      case 2:
        col += 8;
        return row + col;
    }
  }
  rellenaHueco(indice:number){
    console.log(this.huecosPlan);
    this.extrasTupper = [];
    this.indice = indice;
    this.rellena = true;
  }
  getComida(indice:number) {
    let comida: string='';
    if (indice < 5)
      comida+='Desayuno';
    else if (indice >=5 && indice<10)
      comida+='Comida';
    else
      comida += 'Cena';

    if (indice === 0 || indice === 5 || indice === 10)
      comida += ' Lunes';
    else if (indice === 1 || indice === 6 || indice === 11)
      comida += ' Martes';
    else if (indice === 2 || indice === 7 || indice === 12)
      comida += ' Miercoles';
    else if (indice === 3 || indice === 8 || indice === 13)
      comida += ' Jueves';
    else
      comida += ' Viernes';
    return comida;
  }
  deleteHueco(){
    delete this.huecosPlan[this.indice];
    delete this.fotosPlan[this.indice];
    this.rellena = false;
    this.cargaInfoPlan(this.indice);
  }
  cargaInfoPlan(indice:number){
    this.cargaPrecioPlan();
    switch (indice) {
      case 0: case 5: case 10: this.modificaNutricionalesPlan(0);
        break;
      case 1: case 6: case 11: this.modificaNutricionalesPlan(1);
        break;
      case 2: case 7: case 12: this.modificaNutricionalesPlan(2);
        break;
      case 3: case 8: case 13: this.modificaNutricionalesPlan(3);
        break;
      case 4: case 9: case 14: this.modificaNutricionalesPlan(4);
        break;
    }
  }
  modificaNutricionalesPlan(indice: number) {
    this.nutricionPlan[indice] = {calorias: 0, hidratos: 0, grasas: 0, proteinas: 0};
    let modificador = indice;
    for (var i = 0; i < 3; i++) {
      if (this.huecosPlan[modificador] != undefined) {
        if (this.huecosPlan[modificador].plato != null) {
          this.nutricionPlan[indice].calorias += this.huecosPlan[modificador].plato.calorias;
          this.nutricionPlan[indice].hidratos += this.huecosPlan[modificador].plato.hidratos;
          this.nutricionPlan[indice].grasas += this.huecosPlan[modificador].plato.grasas;
          this.nutricionPlan[indice].proteinas += this.huecosPlan[modificador].plato.proteinas;
        } else {
          this.nutricionPlan[indice].calorias += this.huecosPlan[modificador].tupper.nutricionales.calorias;
          this.nutricionPlan[indice].hidratos += this.huecosPlan[modificador].tupper.nutricionales.hidratos;
          this.nutricionPlan[indice].grasas += this.huecosPlan[modificador].tupper.nutricionales.grasas;
          this.nutricionPlan[indice].proteinas += this.huecosPlan[modificador].tupper.nutricionales.proteinas;
        }
      }
      modificador += 5;
    }
  }
  cargaPrecioPlan(){
    this.precioPlan = 0;
    this.huecosPlan.forEach(hueco => {
      if (hueco.plato != null)
        this.precioPlan += hueco.plato.precio;
      else
        this.precioPlan += hueco.tupper.precio;
    })
  }

  async addPlanPersonal(){
    this.loading2 = true;
    let planId;
    this.servicio.creaPlanSemanal({precio:this.precioPlan,familiaid:6}).subscribe(
      (res:any) => {
        planId = res.plan.insertId;
        this.huecosPlan.forEach((hueco,index) => {
          if (hueco.linea === null)
            hueco.linea = {};
          hueco.linea.posicion = index;
          hueco.linea.semanalid = planId;
          if (hueco.plato != null) {
            hueco.linea.platoid = hueco.plato.id;
            this.servicio.creaLineaPlanSemanal(hueco.linea).subscribe(
              res => {
              if (index === this.huecosPlan.length-1){
                //todo terminado el plan semanal
                this.creaLineaCarrito(planId);
                console.log('EXITO');
              }
              },error => {console.log(error)}
            )
          }else if (hueco.tupper != null){
            if (hueco.linea.tupperid != null){
              this.servicio.creaLineaPlanSemanal(hueco.linea).subscribe(
                res => {
                  if (index === this.huecosPlan.length-1){
                    //todo terminado el plan semanal
                    console.log('EXITO');
                    this.creaLineaCarrito(planId);
                  }
                },error => {console.log(error)}
              )
            }else{
              this.servicio.creaTupper({familiaid:5,precio:hueco.tupper.precio}).subscribe(
                (res:any) => {
                  hueco.tupper.alimentos.forEach((alimento,i) => {
                    this.servicio.creaLineaTupper({
                      alimentoId:alimento.alimento.id,
                      alimentoC:alimento.cantidad,
                      tupperId:res.tupper.insertId
                    }).subscribe(
                      next => {
                        if (i === hueco.tupper.alimentos.length - 1){
                          hueco.linea.tupperid = res.tupper.insertId;
                          this.servicio.creaLineaPlanSemanal(hueco.linea).subscribe(
                            then => {
                              if (index === this.huecosPlan.length - 1){
                                //todo terminado el plan
                                console.log('EXITO');
                                this.creaLineaCarrito(planId);
                              }
                            },error1 => {console.log(error1)}
                          )
                        }
                      }, error1 => {console.log(error1)}
                    )
                  })
                }, error => {console.log(error)}
              )
            }

          }
        })
    },error => {console.log(error)}
    )
  }
   creaLineaCarrito(planId:number){
    let error = false;
    this.servicio.creaLineaCarrito({tipo_producto:'Plan personal',precio:this.precioPlan+10,cantidad:1,
    plansemanalid:planId, usuarioid:this.usuarioId.id}).subscribe(
      res => {
        this.resetAll();
        let variables = {nombre:this.usuarioId.nombre};
         this.servicio.mandaEmail(this.usuarioId.correo,'Actualizacion de plan personalizado','plansemanal',variables);
         this.servicio.deleteDietaPersonal(this.solicitudId).subscribe(
          res => {
            this.loading2 = false;
            this.toast.success('Plan personal asignado correctamente','Completado!');
            this.router.navigate(['planes-personalizados']);
          },error1 => {console.log(error1);},
        )
      },error1 => {console.log(error1)}
    )
  }
  resetAll(){
    this.huecosPlan.forEach((x,index) => {
      delete this.huecosPlan[index];
      delete this.fotosPlan[index];
    });
    this.precioPlan = 0;
    this.iniciaNutricionales();
    this.rellena = false;
    this.infoDia = -1;
  }

  //todo empieza gestion de platos

  addPlato(){
    this.fotosPlan[this.indice] = this.platoSeleccionado.foto;
    this.huecosPlan[this.indice] = {linea:{platoid:this.platoSeleccionado.id},plato:this.platoSeleccionado,tupper:null};
    this.platoSeleccionado = {};
    this.rellena = false;
    this.cargaInfoPlan(this.indice);
  }

  //todo empieza gestion de tuppers

  modificaDatosTupper(){
    this.alimentosTupper = [];
    this.alimentosBase.forEach(base => {
      if (base.alimento != null && base.cantidad > 0){
        console.log('añadimos el alimento: ', base);
        this.alimentosTupper.push(base);
      }
    });
    if (this.alimentosTupper.length > 0 || this.extrasTupper.length > 0)
      this.modificaInfoNutricional();
  }
  modificaInfoNutricional(){
    this.nutricionalesTupper = {calorias:0,proteinas:0,grasas:0,hidratos:0};
    this.alimentosTupper.forEach( al => {
      this.nutricionalesTupper.calorias += al.alimento.calorias * (al.cantidad/100);
      this.nutricionalesTupper.grasas += al.alimento.grasas * (al.cantidad/100);
      this.nutricionalesTupper.proteinas += al.alimento.proteinas * (al.cantidad/100);
      this.nutricionalesTupper.hidratos += al.alimento.hidratos * (al.cantidad/100);
    });
    this.extrasTupper.forEach( ex => {
      this.nutricionalesTupper.calorias += ex.calorias;
      this.nutricionalesTupper.grasas += ex.grasas;
      this.nutricionalesTupper.proteinas += ex.proteinas;
      this.nutricionalesTupper.hidratos += ex.hidratos;
    })
  }
  getPrecioTupper(){
    let precio = 0;
    this.alimentosTupper.forEach(alimento => {
      if (alimento.alimento.tipoalimento === 'extras')
        precio += alimento.alimento.precio;
      else
        precio += alimento.alimento.precio * (alimento.cantidad/100);
    });
    return precio;
  }

  async addTupperPlan(){
    console.log('al añadir el tupper los alimentos son: ', this.alimentosTupper);
    this.loading = true;
   let posibleTupperId = await this.servicio.compruebaExistenciaTupper(this.alimentosTupper, this.extrasTupper);
  console.log('posible id es: ', posibleTupperId);
    this.extrasTupper.forEach(extra => {
      console.log('metiendo en alimentos el extra: ', extra);
      this.alimentosTupper.push({alimento:extra,cantidad:Number(extra.nombre.split(' ').reverse()[1])})
    });
  if (posibleTupperId != undefined && Number.isInteger(Number(posibleTupperId))){
    this.huecosPlan[this.indice] = {
      linea:{tupperid:posibleTupperId},
      plato:null,
      tupper:{alimentos:this.alimentosTupper,nutricionales:this.nutricionalesTupper,precio:this.getPrecioTupper()}
    };
  }else{
    this.huecosPlan[this.indice] = {
      linea:null,
      tupper:{alimentos:this.alimentosTupper,nutricionales:this.nutricionalesTupper,precio:this.getPrecioTupper()},
      plato:null
    };
  }
  this.fotosPlan[this.indice] = "/assets/tupperejemplo.jpg";
  this.cargaInfoPlan(this.indice);
  this.resetTupper();
  }
  resetTupper(){
    this.alimentosTupper = [];
    this.extraList = [];
    this.nutricionalesTupper = {};
    this.rellena = false;
    this.alimentosBase[0] = {};
    this.alimentosBase[1] = {};
    this.alimentosBase[2] = {};
    this.loading = false;
  }
  cargaAlimentos(){
    this.servicio.getAliemntos().subscribe(
      (res:Alimento[]) => {
        res.forEach(a => {
          if (a.tipoalimento === 'Verduras')
            this.verduras.push(a);
          else if (a.tipoalimento === 'Carbohidratos')
            this.carbohidratos.push(a);
          else if (a.tipoalimento === 'Proteinas')
            this.proteinas.push(a);
          else
            this.extras.push(a);
        })
      }, error => {console.error(error)}
    )
  }
  modificaExtras() {
    this.extrasTupper = [];
    console.log(this.extraList);
    this.extraList.forEach(item => {
      this.extras.forEach(extra => {
        if (item.id === extra.id)
          this.extrasTupper.push(extra);
      })
    });
      this.modificaInfoNutricional();
  }
}
