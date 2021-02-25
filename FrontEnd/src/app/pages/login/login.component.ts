import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { Enum } from 'src/app/common/Enum';
import { BasePage } from 'src/app/pages/core/BasePage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BasePage implements OnInit {

  loginForm: FormGroup;
  user: User;
  submitted = false;
  get f() { return this.loginForm.controls; }

  constructor(
    private _loginService: LoginService,
    private formBuilder: FormBuilder,
    injector: Injector
    ) {
      super(injector);
     }


  ngOnInit(): void {
    this.submitted = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }
  

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.user = {
      email: this.f.email.value,
      password: this.f.password.value,
    };

    debugger;
    const isAutenticated = await this._loginService.authenticate(this.user);

    if (isAutenticated)
      this.submitted = true;
    else
      this.showToast(Enum.ToastType.error, 'Falha ao realizar o login');

  }


}
