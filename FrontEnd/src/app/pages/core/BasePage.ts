import { Enum } from "../../common/Enum";
import { ToastrService } from 'ngx-toastr';
import { MessageBoxReturn } from "src/app/common/MessageBoxReturn";
import { Modal2Component } from "../components/modal2/modal2.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {Injector} from '@angular/core';

export abstract class BasePage {
  
  private toastr: ToastrService
  private modalService: NgbModal

    constructor(injector: Injector ) {

        this.toastr = injector.get(ToastrService);
        this.modalService = injector.get(NgbModal);

    }

    public showToast(type: Enum.ToastType, message: string, title?: string) {

        const toastOptions = { progressBar: true, positionClass: 'toast-top-full-width' };
    
        switch (type) {
          case Enum.ToastType.sucess:
            this.toastr.success(message, title, toastOptions);
            break;
          case Enum.ToastType.info:
            this.toastr.info(message, title, toastOptions);
            break;
          case Enum.ToastType.warning:
            this.toastr.warning(message, title, toastOptions);
            break;
          default:
            this.toastr.error(message, title, toastOptions);
        }
    
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
        const modalRef = this.modalService.open(Modal2Component, {
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
}