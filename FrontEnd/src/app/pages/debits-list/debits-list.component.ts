import { Component, OnInit } from '@angular/core';
import { DebitService } from 'src/app/services/debit.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enum } from 'src/app/common/Enum';
import { MessageBoxReturn } from 'src/app/common/MessageBoxReturn';
import { Modal2Component } from '../components/modal2/modal2.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debits-list',
  templateUrl: './debits-list.component.html',
  styleUrls: ['./debits-list.component.css']
})
export class DebitsListComponent implements OnInit {

  selectedCustomer: any;
  customers: any[] = [];
  debts: any[] = [];
  currentDebit = null;
  currentIndex = -1;

  constructor(private _debtService: DebitService,
    private _customerService: CustomerService,
    private _toastr: ToastrService,
    private _modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.getDebts();
    this.getCustomers();
  }

  async getDebts() {
    try {
      var result: any = await this._debtService.getAll().toPromise();

      this.debts = result;

    } catch (error) {
      console.log(error);
    }

  }

  async getDebtsByCustomer(customerId: string) {
    try {

      if (customerId == null || customerId == '') return this.getDebts();

      var result: any = await this._debtService.getByCuscomer(customerId).toPromise();

      this.debts = result;

    } catch (error) {
      console.log(error);
    }

  }
  async getCustomers() {
    try {

      var result: any = await this._customerService.getAll().toPromise();

      this.customers = result

    } catch (error) {
      console.log(error);
    }
  }

  setActiveDebit(debit, index) {
    this.currentDebit = debit;
    this.currentIndex = index;
    this.ShowMessageBox('Teste', 'Teste', Enum.enModalOptions.enOK_ONLY);
  }

  onChangeCustomerSelection(event: any) {
    // this.filters.selectedCustomer = event
    this.getDebtsByCustomer(event);
    this.getDebtTotalAmount(event);
  }

  getDebtTotalAmount(customerId: string) {
    if (this.debts && this.debts.length == 0) return 0;

    const sumDebts = this.debts?.filter(x => x.customerId == customerId || (customerId == null || customerId == ""))
      .map(x => x.amount)
      .reduce((total, debt) => {
        total += debt
        return total;
      }, 0);
    return sumDebts;
  }

  edit(index: any){
    console.log(this.debts[index]);
    const debtId = this.debts[index].id
    this.router.navigate(['/register'], { queryParams: { debtId: debtId } })
  }
  remove(index: any) {
    this.ShowMessageBox('Confirma a Exclusão?', 'Confirmar Exclusão', Enum.enModalOptions.enYES_NO, null, async (result: MessageBoxReturn) => {

      if (result.response == Enum.enMessageBoxResult.enNO) {
        return;
      }

      try {
        const debtToRemove = this.debts[index];

        const result2 = await this._debtService.delete(debtToRemove.id).toPromise();

        if (result2) {
          this.showToast(Enum.ToastType.sucess, 'Registro excluido.');
          this.getDebtsByCustomer(this.selectedCustomer);
        } else {
          this.showToast(Enum.ToastType.error, 'Erro ao excluir registro.');
        }
      } catch (error) {
          this.showToast(Enum.ToastType.error, 'Erro ao excluir registro.');
      }



    });
  }

  protected ShowMessageBox(
    message: string,
    title: string,
    option: Enum.enModalOptions,
    command?: string,
    callback?: (result: MessageBoxReturn) => void
  ) {
    /**
     * Se irá utilizar o atalho esc ou não
     * No caso de modal com SIM/Não não será liberado o uso do ESC.
     */
    const keyboard = option !== Enum.enModalOptions.enYES_NO ? true : false;
    const modalRef = this._modalService.open(Modal2Component, {
      backdrop: "static",
      backdropClass: "light-blue-backdrop",
      centered: true,
      keyboard: keyboard
    });

    modalRef.componentInstance.title = title == "" ? 'Informação' : title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = option;
    modalRef.componentInstance.command =
      command === null || command === undefined ? "" : command;

    // NÂO NECESSITA DE UMA RESPOSTA.
    if (option === Enum.enModalOptions.enOK_ONLY) {
      return;
    }

    modalRef.result.then(
      data => { callback(data); },
      reason => { callback(reason); }
    );
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
  getCustomerById(customerId: any): any{
    const customer = this.customers.find((value: any, index: number, obj: any[]) => {
        if(value.id ==  customerId) return value;
    });

    return customer?.name;
  }

}
