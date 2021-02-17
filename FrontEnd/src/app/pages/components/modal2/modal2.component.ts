import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Enum } from "../../../common/Enum"
import { MessageBoxReturn } from "../../../common/MessageBoxReturn"; 

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.css']
})
export class Modal2Component implements OnInit {

  @Input() title: string;
  @Input() type: Enum.enModalOptions;
  @Input() message: string;
  @Input() command: string;

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {
      console.log(this.type);
    }

  Result(ret: string): MessageBoxReturn {
    const result: MessageBoxReturn = new MessageBoxReturn();

    result.cancelamentToken = (ret === 'ESC' ? true : false);
    switch (ret) {
      case 'ESC':
        result.command = '';
        result.response = Enum.enMessageBoxResult.enCANCEL;
        break;
      case 'YES':
        result.response = Enum.enMessageBoxResult.enYES;
        result.command = this.command;
        break;
      case 'NO':
        result.response = Enum.enMessageBoxResult.enNO;
        result.command = this.command;
        break;
      case 'OK':
        result.command = '';
        result.response = Enum.enMessageBoxResult.enOK;
        break;
    }
    return result;
  }
}
