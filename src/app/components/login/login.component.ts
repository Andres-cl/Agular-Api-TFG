import { Component, OnInit } from '@angular/core';
import {GlobaUser} from "../../models/GlobaUser";
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthServiceService, private router:Router) { }

  private user:GlobaUser = {
    usuario: '',
    password: ''
  };
  private isError:boolean = false;
  ngOnInit() {
  }
  onLogin( form?:NgForm){
    if (this.user.usuario === '' || this.user.password === ''){
      console.log('error');
      this.isError = true
    }else{
      return this.authService.loginUser(this.user.usuario, this.user.password).subscribe(
        data => {
          console.log(data);
          this.authService.setUser(data);
          this.router.navigate(['principal']);
        },err => {
          this.isError = true;
          form.resetForm();
          setTimeout(() => {
            this.isError = false;
          },1000);
        }
      )
    }
  }

}
