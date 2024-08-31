import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-summary-request-modal',
  standalone: true,
  imports: [],
  templateUrl: './summary-request-modal.component.html',
  styleUrl: './summary-request-modal.component.scss'
})
export class SummaryRequestModalComponent {


  constructor(public activeModal: NgbActiveModal){}

  
  nextScreen(){
    this.activeModal.close('SummaryRequestModalComponent');
  }
}
