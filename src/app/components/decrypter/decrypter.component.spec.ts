import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecrypterComponent } from './decrypter.component';

describe('DecrypterComponent', () => {
  let component: DecrypterComponent;
  let fixture: ComponentFixture<DecrypterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecrypterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecrypterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
