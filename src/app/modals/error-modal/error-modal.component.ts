import { CommonModule } from '@angular/common';
import { Component, Input,  } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})

export class ErrorModalComponent {

  @Input() data: any;
  isCookiesDisabled : boolean = false;

  constructor(){};
  
  ngOnInit(){
    this.isCookiesDisabled = this.data.isCookiesEnabled
  }
  
}

