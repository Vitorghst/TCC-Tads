import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoPedidosComponent } from './gerenciamento-pedidos.component';

describe('GerenciamentoPedidosComponent', () => {
  let component: GerenciamentoPedidosComponent;
  let fixture: ComponentFixture<GerenciamentoPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciamentoPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciamentoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
