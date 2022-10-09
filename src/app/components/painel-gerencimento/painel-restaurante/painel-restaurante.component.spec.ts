import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelRestauranteComponent } from './painel-restaurante.component';

describe('PainelRestauranteComponent', () => {
  let component: PainelRestauranteComponent;
  let fixture: ComponentFixture<PainelRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
