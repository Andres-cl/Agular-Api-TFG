import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Familia} from "../models/Familia";
import {Alimento} from "../models/Alimento";
import {Plato} from "../models/Plato";
import {Faq} from "../models/faq";
import {Codigo} from "../models/Codigo";
import {Usuario} from "../models/Usuario";
import {PlanSemanal} from "../models/PlanSemanal";
import {PlatoPlanSemanal} from "../models/PlatoPlanSemanal";
import {Tupper} from "../models/Tupper";
import {AlimentoTupper} from "../models/AlimentoTupper";
import {LineaCarrito} from "../models/LineaCarrito";
import {ToastrService} from "ngx-toastr";
//import mailgun from "mailgun.js";

@Injectable({
  providedIn: 'root'
})
export class ApiconexionService {

  API_URI = 'http://localhost:3000/api/ff';
  mailgunApiKey : string = '81530dc8752fa7273e8d777af332bfac-aa4b0867-032e1a2b';
  mailgunUrlold: string = 'ffcompany.business';
  mailgunUrl: string = '/v3/ffcompany.business/messages';

  constructor(private http:HttpClient, private toast:ToastrService) {
  }


  getFamilias(){
    return this.http.get(`${this.API_URI}/familias`);
  }
  getFamilia(id:string){
    return this.http.get(`${this.API_URI}/familias/${id}`);
  }
  postFamilias(familia:Familia){
    return this.http.post(`${this.API_URI}/familias`,familia);
  }
  getUsers(){
    return this.http.get(`${this.API_URI}/usuarios`);
  }
  getUser(id:number){
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  }
  updateUsers(id:string, user:Usuario){
    return this.http.put(`${this.API_URI}/usuarios/${id}`,user);
  }
  deleteFamilias(id:number){
    return this.http.delete(`${this.API_URI}/familias/${id}`);
  }
  updateFamilias(id:string, familia:Familia){
    return this.http.put(`${this.API_URI}/familias/${id}`,familia);
  }
  getAliemntos(){
    return this.http.get(`${this.API_URI}/alimentos`);
  }
  getAliemnto(id:string){
    return this.http.get(`${this.API_URI}/alimentos/${id}`);
  }
  postAlimento(alimento:Alimento){
    return this.http.post(`${this.API_URI}/alimentos`,alimento);
  }
  updateAlimentos(id:string, alimento:Alimento){
    return this.http.put(`${this.API_URI}/alimentos/${id}`,alimento);
  }
  deleteAlimentos(id:string){
    return this.http.delete(`${this.API_URI}/alimentos/${id}`);
  }
  getPlato(id:string){
    return this.http.get(`${this.API_URI}/platos/${id}`);
  }
  getPLatos(){
    return this.http.get(`${this.API_URI}/platos`);
  }
  postPlato(plato:Plato){
    return this.http.post(`${this.API_URI}/platos`,plato);
  }
  updatePlato(id:string, plato:Plato){
    return this.http.put(`${this.API_URI}/platos/${id}`,plato);
  }
  deletePlatos(id:string){
    return this.http.delete(`${this.API_URI}/platos/${id}`);
  }
  creaTupper(tupper:Tupper){
    return this.http.post(`${this.API_URI}/tuppers`, tupper);
  }
  creaLineaTupper(lineaTupper:AlimentoTupper){
    return this.http.post(`${this.API_URI}/tuppersalimentos`, lineaTupper);
  }
  getPreguntas(){
    return this.http.get(`${this.API_URI}/faq`);
  }
  getPregunta(id:string){
    return this.http.get(`${this.API_URI}/faq/${id}`);
  }
  postPregunta(pregunta:Faq){
    return this.http.post(`${this.API_URI}/faq`,pregunta);
  }
  updatePregunta(id:string, pregunta:Faq){
    return this.http.put(`${this.API_URI}/faq/${id}`,pregunta);
  }
  deletePregunta(id:string){
    return this.http.delete(`${this.API_URI}/faq/${id}`);
  }
  postCodigo(codigo:Codigo){
    return this.http.post(`${this.API_URI}/codigospromocionales`,codigo);
  }
  updateCodigo(id:string, codigo:Codigo){
    return this.http.put(`${this.API_URI}/codigospromocionales/${id}`,codigo);
  }
  deleteCodigo(id:number){
    return this.http.delete(`${this.API_URI}/codigospromocionales/${id}`);
  }
  getCodigo(id:number){
    return this.http.get(`${this.API_URI}/codigospromocionales/${id}`);
  }
  getCodigos(){
    return this.http.get(`${this.API_URI}/codigospromocionales/`);
  }
  getGlobalUsers(){
    return this.http.get(`${this.API_URI}/globalUsers/`);
  }
  deleteGlobalUser(id:number){
    return this.http.delete(`${this.API_URI}/globalUsers/${id}`);
  }
  getDietasPersonales(){
    return this.http.get(`${this.API_URI}/dietaPersonal/`);
  }
  getDietaPersonal(id:string){
    return this.http.get(`${this.API_URI}/dietaPersonal/${id}`);
  }
  deleteDietaPersonal(id:number){
    return this.http.delete(`${this.API_URI}/dietaPersonal/${id}`);
  }
  getAlimentosIndeseadosDieta(id:number){
    return this.http.get(`${this.API_URI}/dietaPersonal/alimentosIndeseados/dieta/${id}`);
  }
  creaPlanSemanal(plan:PlanSemanal){
    return this.http.post(`${this.API_URI}/planSemanal`, plan);
  }
  creaLineaPlanSemanal(lineaPlan:PlatoPlanSemanal){
    return this.http.post(`${this.API_URI}/planSemanal/lineasPlan`, lineaPlan);
  }
  creaLineaCarrito(lineaCarrito:LineaCarrito){
    return this.http.post(`${this.API_URI}/lineas_carrito/`, lineaCarrito);
  }
  getAlimentosTupper(id:number){
    return this.http.get(`${this.API_URI}/tuppersalimentos/${id}`);
  }
  getTuppers(){
    return this.http.get(`${this.API_URI}/tuppers/`);
  }
  async getAlsTupper(id:number){
    try {
      return await this.getAlimentosTupper(id).toPromise();
    }catch (e) {
      return null;
    }
  }
  async getAllTuppers(){
    try {
      return await this.getTuppers().toPromise();
    }catch (e) {
      return null;
    }
  }
  async compruebaExistenciaTupper(alimentosNuevos:any[], extras:Alimento[]) {
    let contador;
    let tuppers: any = await this.getAllTuppers();
    let numalsNuevo = alimentosNuevos.length + extras.length;
    let numalsExistente;
    if (tuppers.length > 0) {
      for (const tupper of tuppers) {
        contador = 0;
        const alimentos: any = await this.getAlsTupper(tupper.id);
        if (alimentos.length > 0) {
          numalsExistente = alimentos.length;
          alimentos.forEach(existentes => {
            alimentosNuevos.forEach(nuevos => {
              if (nuevos.alimento.id === existentes.alimentoId && Number(nuevos.cantidad) === existentes.alimentoC) {
                contador++;
              }
            });
            extras.forEach(extra => {
              if (extra.id === existentes.alimentoId && existentes.alimentoC === Number(extra.nombre.split(' ').reverse()[1])) {
                contador++;
              }
            });
          });
          if (numalsNuevo == numalsExistente && numalsExistente === contador) {
            console.log('Bingo el tupper esta registrado');
            return tupper.id;
          }
        }
      }
    }
  }
  mandaEmail(para:string, asunto:string, template:string, test) {
    let _auth = btoa('api:'+this.mailgunApiKey);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + _auth,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = {
      from: 'theffcompany2@gmail.com',
      to: para,
      subject: 'Estado Plan Personalizado',
      html: "holaa"
    };

    let url = this.mailgunUrl;
    let data = "from=" + "FF Company <theffcompany2@gmail.com>" + "&to=" + para + "&subject=" + asunto + "&template=" + template
      + "&h:X-Mailgun-Variables=" + JSON.stringify(test);
      // "&v:nombre=" + test.nombre + "&v:descuento=" + test.descuento + "&v:codigo=" + test.codigo;
    return this.http.post(url,data, {headers:headers}).subscribe(
      res => {
        console.log('todo perfecto');
      },error => {
        console.log('error al enviar el correo', error);
      this.toast.error('Error al enviar correo electronico de confirmación');
      }
    )

  }







}
