import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserComponent } from './modal-user.component';

describe('ModalUserComponent', () => {
  let component: ModalUserComponent;
  let fixture: ComponentFixture<ModalUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUserComponent]
    });
    fixture = TestBed.createComponent(ModalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
