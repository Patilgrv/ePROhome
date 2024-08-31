import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpModalComponent } from './verify-otp-modal.component';

describe('VerifyOtpModalComponent', () => {
  let component: VerifyOtpModalComponent;
  let fixture: ComponentFixture<VerifyOtpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyOtpModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyOtpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
