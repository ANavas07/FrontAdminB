import { TestBed } from '@angular/core/testing';

import { OutputProductService } from './output-product.service';

describe('OutputProductService', () => {
  let service: OutputProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
