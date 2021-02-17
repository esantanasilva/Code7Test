import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitsListComponent } from './debits-list.component';

describe('DebitsListComponent', () => {
  let component: DebitsListComponent;
  let fixture: ComponentFixture<DebitsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
