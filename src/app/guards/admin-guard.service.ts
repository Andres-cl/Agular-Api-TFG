import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from "../services/auth-service.service";
import {GlobaUser} from "../models/GlobaUser";
import {isNullOrUndefined} from "util";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService:AuthServiceService, private router:Router){}

  canActivate(){
    let user:GlobaUser = this.authService.getCurrentUser();
    if (!isNullOrUndefined(user)){
      return user.usuario === 'admin' && user.rol === 'administrador' && user.nombre === 'admin';
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
