import { TestBed } from '@angular/core/testing';

import { ListaTelaService } from './lista-tela.service';

describe('ListaTelaService', () => {
  let service: ListaTelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaTelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
