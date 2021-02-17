import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDebtComponent } from './register-debt.component';

describe('RegisterDebtComponent', () => {
  let component: RegisterDebtComponent;
  let fixture: ComponentFixture<RegisterDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
