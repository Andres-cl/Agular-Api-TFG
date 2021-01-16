import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";
import {AdminGuard} from "../../guards/admin-guard.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService:AuthServiceService, private router:Router, private guards :AdminGuard) { }

  ngOnInit() {
  }
  onLogOut(){
    this.authService.logOut();
    this.router.navigate(['login']);
  }

}
