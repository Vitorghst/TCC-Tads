import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTelaComponent } from './listar-tela.component';

describe('ListarTelaComponent', () => {
  let component: ListarTelaComponent;
  let fixture: ComponentFixture<ListarTelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
