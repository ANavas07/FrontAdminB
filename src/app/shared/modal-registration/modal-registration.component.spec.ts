import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrationComponent } from './modal-registration.component';

describe('ModalRegistrationComponent', () => {
  let component: ModalRegistrationComponent;
  let fixture: ComponentFixture<ModalRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRegistrationComponent]
    });
    fixture = TestBed.createComponent(ModalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
