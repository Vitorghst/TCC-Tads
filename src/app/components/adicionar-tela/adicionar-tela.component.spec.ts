import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTelaComponent } from './adicionar-tela.component';

describe('AdicionarTelaComponent', () => {
  let component: AdicionarTelaComponent;
  let fixture: ComponentFixture<AdicionarTelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarTelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarTelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
