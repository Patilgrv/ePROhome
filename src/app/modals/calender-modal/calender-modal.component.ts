import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-calender-modal',
  standalone: true,
  imports: [],
  templateUrl: './calender-modal.component.html',
  styleUrl: './calender-modal.component.scss'
})
export class CalenderModalComponent implements OnInit , AfterViewInit  {
  minDate!: string;
  @ViewChild('dateInput') dateInput!: ElementRef;

  constructor(public activeModal: NgbActiveModal){

  }


  ngAfterViewInit() {
    $('#datepicker').datepicker({
      format: "yyyy-mm-dd",
      todayHighlight: true,
      language: "en",
      changeMonth: true,
      ClassName: "active-day-theme",
      startDate: new Date()
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const datePickerInput = document.getElementById('datepicker');

      
      if (datePickerInput) {
        datePickerInput.click();
      }
    }, 0);

  }
   
  setSelectedDate() {
    // Set selected date logic here
  }
  closeModal() {
  //   const modal = document.getElementById('calendarModal');
  //   if (modal) {
  //     modal.click();
  //   }
  // }

    this.activeModal.close('CalenderModalComponent');
  }
}

