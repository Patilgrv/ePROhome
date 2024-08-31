import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request-appointment-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-appointment-details-modal.component.html',
  styleUrl: './request-appointment-details-modal.component.scss'
})
export class RequestAppointmentDetailsModalComponent {

  hearAboutUsList:any

constructor(
  public activeModal: NgbActiveModal,
){
  console.log("RequestAppointmentDetailsModalComponent invoked");
  
}



  
RequestPersonalDetails(event: Event) : void {
  const form = document.querySelector('form');
  if (form && form.checkValidity()) {
    this.activeModal.close({ component: 'RequestAppointmentDetailsModalComponent', value: { value: 'string' }, size: 'lg' });
   event.preventDefault();
  // event.stopPropagation();
  } else {
    console.log('Form is invalid');
  }
}	

}
 