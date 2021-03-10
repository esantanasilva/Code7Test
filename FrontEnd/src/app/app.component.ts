import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';

  isLoggedIn$: boolean; 

  constructor(private router: Router,private loginService: LoginService){
  }

  ngOnInit(): void {
    this.loginService.loggedIn.subscribe(result => {
      console.log("AppComponent Result:" + result);
      this.isLoggedIn$ = result;
    });
  }

  logout(){
    this.loginService.logout();
  }


}
