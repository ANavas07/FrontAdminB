import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOutputComponent } from './page-output.component';

describe('PageOutputComponent', () => {
  let component: PageOutputComponent;
  let fixture: ComponentFixture<PageOutputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageOutputComponent]
    });
    fixture = TestBed.createComponent(PageOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
