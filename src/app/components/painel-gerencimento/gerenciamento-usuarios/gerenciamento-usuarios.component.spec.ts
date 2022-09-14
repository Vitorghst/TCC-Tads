import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoUsuariosComponent } from './gerenciamento-usuarios.component';

describe('GerencimamentoUsuariosComponent', () => {
  let component: GerenciamentoUsuariosComponent;
  let fixture: ComponentFixture<GerenciamentoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciamentoUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciamentoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
