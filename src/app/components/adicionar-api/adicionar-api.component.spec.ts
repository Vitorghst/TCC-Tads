import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarApiComponent } from './adicionar-api.component';

describe('AdicionarApiComponent', () => {
  let component: AdicionarApiComponent;
  let fixture: ComponentFixture<AdicionarApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
