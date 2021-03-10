import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enum } from 'src/app/common/Enum';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { BasePage } from '../core/BasePage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BasePage implements OnInit {

  registerForm: FormGroup;
  user: User;
  submitted = false;
  
  get f() { return this.registerForm.controls; }

  constructor(
    private _loginService: LoginService,
    private formBuilder: FormBuilder,
    injector: Injector
    ) {
      super(injector);
     }


  ngOnInit(): void {
    this.submitted = false;
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordCheck: ['', Validators.required]
    });

  }

  async register() {
    if (this.registerForm.invalid) {
      return;
    }

    if(this.f.password.value !== this.f.passwordCheck.value){
      this.showToast(Enum.ToastType.warning, 'Os passwords devem ser iguais')
      return;
    }

    this.user = {
      email: this.f.email.value,
      password: this.f.password.value,
    };

    debugger;
    const registred = await this._loginService.create(this.user);

    console.log(registred);

  }

  backToLogin(){
    this._loginService.logout();
  }
}
