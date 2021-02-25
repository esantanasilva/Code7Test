import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public loginService: LoginService, public router: Router) {}
  canActivate(): boolean {

    this.loginService.isLoggedIn();
    
    this.loginService.loggedIn.subscribe(result => {
      if (!result) {this.loginService.logout()}
    });


    return true;
  }
}