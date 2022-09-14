import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelGerencimentoComponent } from './painel-gerencimento.component';

describe('PainelGerencimentoComponent', () => {
  let component: PainelGerencimentoComponent;
  let fixture: ComponentFixture<PainelGerencimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelGerencimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelGerencimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
