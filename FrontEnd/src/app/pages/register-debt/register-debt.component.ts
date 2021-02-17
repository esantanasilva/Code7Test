import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Debt } from 'src/app/models/debit';
import { DebitService } from 'src/app/services/debit.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Enum } from 'src/app/common/Enum';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Moment from 'moment'
@Component({
  selector: 'app-register-debt',
  templateUrl: './register-debt.component.html',
  styleUrls: ['./register-debt.component.css']
})
export class RegisterDebtComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  customers: any;
  debt: Debt;
  updating: boolean;
  customerId: any;
  updatingDebt: any;

  constructor(
    private _debitService: DebitService,
    private _customerService: CustomerService,
    private formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(async (params) => {

        const debt: any = await this._debitService.get(params['debtId']).toPromise();

        if (debt) {
          this.updating = true;
          this.updatingDebt = debt;
          this.debt = new Debt();

          this.registerForm = this.formBuilder.group({
            customer: ['', Validators.required],
            reason: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(1)]],
            debtDate: ['', [Validators.required, Validators.minLength(6)]]
          });

          this.registerForm.get('customer').setValue(debt.customerId);
          this.registerForm.get('reason').setValue(debt.reason);
          this.registerForm.get('amount').setValue(debt.amount);
          this.registerForm.get('debtDate').setValue(this.formatDate(new Date(debt.debtDate)));
          console.log(this.formatDate(new Date(debt.debtDate)));
          this.customerId = debt.customerId;
          
        }

      });

    this.getCustomers();
    this.debt = new Debt();
    this.registerForm = this.formBuilder.group({
      customer: ['', Validators.required],
      reason: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      debtDate: ['', [Validators.required]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }

    this.debt = {
      amount: Number(this.f.amount.value),
      debtDate: this.f.debtDate.value,
      reason: this.f.reason.value,
      customerId: this.f.customer.value,
    };
    this._debitService.create(this.debt)
      .subscribe(
        response => {
          console.log(response);
          this.showToast(Enum.ToastType.sucess, 'Registro gravado com sucesso!');
          this.submitted = true;

        },
        error => {
          this.showToast(Enum.ToastType.error, 'Ocorreu um erro ao salvar o registro.');
          console.log(error);
        });
  }

  onChangeCustomerSelection(event: any) { }

  async getCustomers() {
    try {
      var result = await this._customerService.getAll().toPromise();
      this.customers = result
    } catch (error) {
      this.showToast(Enum.ToastType.error, 'Erro ao obter clientes.');
    }
  }

  update() {
    debugger;
    if (this.registerForm.invalid) {
      return;
    }

    this.debt = {
      id: this.updatingDebt.id,
      createdAt: this.updatingDebt.createdAt,
      amount: Number(this.f.amount.value),
      debtDate: this.f.debtDate.value,
      reason: this.f.reason.value,
      customerId: this.f.customer.value,
    };
    this._debitService.update(this.debt)
      .subscribe(
        response => {
          console.log(response);
          this.showToast(Enum.ToastType.sucess, 'Registro alterado com sucesso!');
          this.submitted = true;

          this.router.navigate(['/debits'])

        },
        error => {
          this.showToast(Enum.ToastType.error, 'Ocorreu um erro ao salvar o registro.');
          console.log(error);
        });
  }

  newDebit() {
    this.submitted = false;
    this.registerForm.reset();
    this.debt = new Debt();
    this.updating = false;
  }

  showToast(type: Enum.ToastType, message: string, title?: string) {

    const toastOptions = { progressBar: true, positionClass: 'toast-top-full-width' };

    switch (type) {
      case Enum.ToastType.sucess:
        this._toastr.success(message, title, toastOptions);
        break;
      default:
        this._toastr.error(message, title, toastOptions);
    }

  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
}
