import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuPedidosComponent } from './side-menu-pedidos.component';

describe('SideMenuPedidosComponent', () => {
  let component: SideMenuPedidosComponent;
  let fixture: ComponentFixture<SideMenuPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
