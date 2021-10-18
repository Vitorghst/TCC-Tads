import { TestBed } from '@angular/core/testing';

import { AdicionarApiService } from './adicionar-api.service';

describe('AdicionarApiService', () => {
  let service: AdicionarApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionarApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
