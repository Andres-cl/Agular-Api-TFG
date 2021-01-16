import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GlobaUser} from "../../models/GlobaUser";
import {ApiconexionService} from "../../services/apiconexion.service";
import {NgForm} from "@angular/forms";
import {AuthServiceService} from "../../services/auth-service.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('form',{static:false}) form:NgForm;
  private usuario:GlobaUser = {nombre : '', usuario : '', password : '', rol:''};
  users:GlobaUser[];
  private pass2:string = null;
  private nuevo:boolean = true;
  private adminAlert:boolean = false;
  private idToUpdate;
  constructor(private servicio:ApiconexionService,private auth:AuthServiceService) { }

  ngOnInit() {
    this.cargaUsers();
  }

  cargaUsers(){
    this.servicio.getGlobalUsers().subscribe(
      (res:GlobaUser[]) => {
        this.users = res;
      },error => {console.error(error);}
    )
  }
  isAdmin(user:GlobaUser) {
    return (user.rol === 'administrador' && user.usuario === 'admin' && user.password === '1234');
  }


  addNewUser(form?:NgForm){
    this.usuario = form.value;
    this.adminAlert = (this.usuario.usuario === 'admin');
    if (!this.adminAlert) {
      console.log(this.usuario);
      if (this.nuevo) {
        this.auth.register(this.usuario).subscribe(
          (res: any) => {
            this.usuario.id = res.user.insertId;
            this.users.push(this.usuario);
            form.resetForm();
            this.pass2 = '';
          }, error => {
            console.error(error)
          }
        )
      } else {
        this.usuario.id = this.idToUpdate;
        this.auth.update(this.usuario).subscribe(
          res => {
            this.cargaUsers();
            form.resetForm();
            this.pass2 = '';
            this.nuevo = true;
          }
        )
      }
    }
  }
  deleteUser(id:number,index:number){
    this.servicio.deleteGlobalUser(id).subscribe(
      res => {
        this.users.splice(index,1);
      },error => {console.error(error);}
    )
  }
  abreEditar(user:any){
    this.nuevo = false;
    this.idToUpdate = user.id;
    delete user.id;
    this.form.control.setValue(user);
  }

}
