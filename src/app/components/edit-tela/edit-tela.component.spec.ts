import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTelaComponent } from './edit-tela.component';

describe('EditTelaComponent', () => {
  let component: EditTelaComponent;
  let fixture: ComponentFixture<EditTelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
