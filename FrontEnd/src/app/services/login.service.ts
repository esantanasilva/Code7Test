import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const baseUrl = `${environment.baseUrlApi}:${environment.baseUrlApiPort}/api/User`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) { }

  async create(data): Promise<boolean> {
    const result: any = await this.http.post(`${baseUrl}/register`, data).toPromise();
    if(result){
      return new Promise(resolve => result);
    }
  }

  async authenticate(data): Promise<boolean> {
    try {

      const result: any = await this.http.post(`${baseUrl}/login`, data).toPromise();

      if (result) {
        this.loggedIn.next(true);
        localStorage.setItem('access_token', result.access_token);
        this.router.navigate(['/']);
        return new Promise(resolve => true);
      } else {
        return new Promise(resolve => false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }


  public logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
    this.loggedIn.next(false);
  }

  checkLogin(): boolean {
    if(this.getToken() == '') {
      this.logout();
      return false;
    }

    this.loggedIn.next(true);
    return true;
  }

  public registerNewUser(){
    this.router.navigate(['register-user']);
  }
}
