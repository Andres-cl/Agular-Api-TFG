import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {isNullOrUndefined} from "util";
import {map} from "rxjs/operators";
import {GlobaUser} from "../models/GlobaUser";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  register(user:GlobaUser):Observable<any>{
    return this.http.post('http://localhost:3000/api/ff/globalUsers',user).pipe(map(data => data));
  }
  loginUser(email:string,password:string): Observable<any>{
  return this.http.get(`http://localhost:3000/api/ff/globalUsers/${email}/${password}`)
  .pipe(map(data => data));
  }
  update(user:GlobaUser):Observable<any>{
    return this.http.put(`http://localhost:3000/api/ff/globalUsers/${user.id}`,user)
      .pipe(map(data => data));
  }

  setUser(user){
  let user_sring = JSON.stringify(user);
  localStorage.setItem('current', user_sring);
  }
  getCurrentUser(){
    let user_string = localStorage.getItem('current');
    if (!isNullOrUndefined(user_string)){
      let user = JSON.parse(user_string);
      return user;
    }else{
      null
    }
  }
  isAdmin(){
    let user_string = localStorage.getItem('current');
    if (!isNullOrUndefined(user_string)){
      let user:GlobaUser = JSON.parse(user_string);
      return user.usuario === 'admin' && user.nombre === 'admin' && user.rol === 'administrador';
    }else{
      null
    }
  }

  logOut(){
   localStorage.removeItem('current');
  }

}
