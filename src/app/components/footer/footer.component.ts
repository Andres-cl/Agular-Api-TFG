import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {Usuario} from "../../models/Usuario";
import {GlobaUser} from "../../models/GlobaUser";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private user :GlobaUser;
  constructor(private authService:AuthServiceService) {
    this.user = {}
  }

  ngOnInit() {

  }

  getUser():boolean{
    let user = this.authService.getCurrentUser();
    if (user != null){
      this.user = user;
      return true;
    }else
      return false;
  }

}
