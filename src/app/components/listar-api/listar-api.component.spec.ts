import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarApiComponent } from './listar-api.component';

describe('ListarApiComponent', () => {
  let component: ListarApiComponent;
  let fixture: ComponentFixture<ListarApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
