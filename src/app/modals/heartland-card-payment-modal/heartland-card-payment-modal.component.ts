import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-heartland-card-payment-modal',
  standalone: true,
  imports: [],
  templateUrl: './heartland-card-payment-modal.component.html',
  styleUrl: './heartland-card-payment-modal.component.scss'
})
export class HeartlandCardPaymentModalComponent {


  constructor(public activeModal: NgbActiveModal){}

  
  nextScreen(){
    this.activeModal.close('HeartlandCardPaymentModalComponent');
  }
  
}
