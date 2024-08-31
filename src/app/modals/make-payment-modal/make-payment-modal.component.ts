import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-make-payment-modal',
  standalone: true,
  imports: [],
  templateUrl: './make-payment-modal.component.html',
  styleUrl: './make-payment-modal.component.scss'
})
export class MakePaymentModalComponent {
  constructor(public activeModal: NgbActiveModal){}
   
   
   nextScreen(){
    this.activeModal.close('MakePaymentModalComponent');
   }
}


