import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-authorize-dot-net-card-payment-modal',
  standalone: true,
  imports: [],
  templateUrl: './authorize-dot-net-card-payment-modal.component.html',
  styleUrl: './authorize-dot-net-card-payment-modal.component.scss'
})
export class AuthorizeDotNetCardPaymentModalComponent {

constructor(public activeModal: NgbActiveModal){}

  
  nextScreen(){
    this.activeModal.close('AuthorizeDotNetCardPaymentModalComponent');
  }
  
}
