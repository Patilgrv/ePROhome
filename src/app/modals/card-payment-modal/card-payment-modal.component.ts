import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-card-payment-modal',
  standalone: true,
  imports: [],
  templateUrl: './card-payment-modal.component.html',
  styleUrl: './card-payment-modal.component.scss'
})
export class CardPaymentModalComponent {



  constructor(public activeModal: NgbActiveModal){}

  
  nextScreen(){
    this.activeModal.close('CardPaymentModalComponent');
  }
  
}
