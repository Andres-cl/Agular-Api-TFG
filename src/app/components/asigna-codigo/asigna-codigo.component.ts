import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Codigo} from "../../models/Codigo";
import {ApiconexionService} from "../../services/apiconexion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-asigna-codigo',
  templateUrl: './asigna-codigo.component.html',
  styleUrls: ['./asigna-codigo.component.css']
})
export class AsignaCodigoComponent implements OnInit {

  private codi:Codigo = {};
  private usuarios:Usuario[];
  @ViewChildren("div", {read:ElementRef}) elementos;
  constructor(private servicio:ApiconexionService, private ruta:ActivatedRoute,private router:Router, private toast: ToastrService) { }

  private isError = false;
  private loading = false;
  private seleccionados:Usuario[] = [];
  ngOnInit() {
    this.servicio.getUsers().subscribe(
      (res:Usuario[]) => {
        this.usuarios = [];
        this.usuarios = res;
      }
    );
    this.servicio.getCodigo(Number(this.ruta.snapshot.paramMap.get('id'))).subscribe(
      (res:Codigo) => {
        this.codi = res;
      },error => {console.log(error)}
    )
  }
  ngAfterViewInit(){
    this.elementos.changes
      .subscribe(() => console.log(this.elementos));
  }
  getFecha(){
    var fecha =new Date(this.codi.validez);
    return fecha.toLocaleDateString();
  }
  async aplicarDescuentos(){
    let error = false;
    if (this.seleccionados.length > 0){
      this.loading = true;
      for (let user of this.seleccionados){
        user.promocionalid = this.codi.id;
        user.creado_en = new Date(user.creado_en).toLocaleDateString().split('/').reverse().join('-');
        await this.servicio.updateUsers(user.id.toString(),user).toPromise().catch(err => {console.log(err);error = true});
        if (!error) {
          let variables = {codigo:this.codi.codigo, descuento:this.codi.descuento,nombre:user.nombre};
          this.servicio.mandaEmail(user.correo, ""+this.codi.descuento+"% de Descuento en FF Company", 'asignacodigos', variables);
          this.toast.success('Códigos asignados correctamente','Éxito!');
        }
      }
      this.loading = false;
      this.limpia();
    }else{
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      },2000);

    }
  }
  limpia(){
    this.seleccionados = [];
    this.elementos.forEach(e => {
      if (e.nativeElement.classList.contains('active'))
        e.nativeElement.classList.remove('active');
    });
    this.router.navigate(['/codigos']);
  }
  addUser(user:Usuario, element){
    let index = this.seleccionados.indexOf(user);
    if (index === -1){
      this.seleccionados.push(user);
      element.classList.add('active');
    }else{
      this.seleccionados.splice(index,1);
      element.classList.remove('active');
    }
  }
  selectAll(){
    if (this.seleccionados.length != this.usuarios.length) {
      this.seleccionados = [];
      this.usuarios.forEach(user => {
        this.seleccionados.push(user);
      });
      this.elementos.forEach(elemento => {
        if (!elemento.nativeElement.classList.contains('active'))
          elemento.nativeElement.classList.add('active');
      });
    }else{
      this.seleccionados = [];
      this.elementos.forEach(elemento => {
        elemento.nativeElement.classList.remove('active');
      })
    }
  }

}
