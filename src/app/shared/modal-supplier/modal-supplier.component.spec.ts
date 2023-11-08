import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupplierComponent } from './modal-supplier.component';

describe('ModalSupplierComponent', () => {
  let component: ModalSupplierComponent;
  let fixture: ComponentFixture<ModalSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSupplierComponent]
    });
    fixture = TestBed.createComponent(ModalSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
