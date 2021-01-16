import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {GlobaUser} from "../models/GlobaUser";
import {AuthServiceService} from "../services/auth-service.service";
import {ToastrService} from "ngx-toastr";
import {isNullOrUndefined} from "util";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService:AuthServiceService, private router:Router, private toast:ToastrService){}
  canActivate(route:ActivatedRouteSnapshot){
    const expected: any[] = route.data.esperado;
    let user:GlobaUser = this.authService.getCurrentUser();
    if (!isNullOrUndefined(user)) {
      for (const esperado of expected) {
        if (user.rol === esperado) {
          return true;
        }
      }
        this.router.navigate(['principal']);
        this.toast.warning('No tienes permisos para entrar');
        return false;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
