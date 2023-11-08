import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoryComponent } from './modal-category.component';

describe('ModalCategoryComponent', () => {
  let component: ModalCategoryComponent;
  let fixture: ComponentFixture<ModalCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCategoryComponent]
    });
    fixture = TestBed.createComponent(ModalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
