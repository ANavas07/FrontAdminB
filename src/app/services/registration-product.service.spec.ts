import { TestBed } from '@angular/core/testing';

import { RegistrationProductService } from './registration-product.service';

describe('RegistrationProductService', () => {
  let service: RegistrationProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
