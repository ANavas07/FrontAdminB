import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegistrationComponent } from './page-registration.component';

describe('PageRegistrationComponent', () => {
  let component: PageRegistrationComponent;
  let fixture: ComponentFixture<PageRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageRegistrationComponent]
    });
    fixture = TestBed.createComponent(PageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
