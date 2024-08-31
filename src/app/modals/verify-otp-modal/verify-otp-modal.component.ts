import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-verify-otp-modal',
  standalone: true,
  imports: [],
  templateUrl: './verify-otp-modal.component.html',
  styleUrl: './verify-otp-modal.component.scss'
})
export class VerifyOtpModalComponent {

  patientPhone = '132132'


  constructor(public activeModal: NgbActiveModal){}

  nextScreen(){
    this.activeModal.close('VerifyOtpModalComponent');
  }
}
