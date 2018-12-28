import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExamComponent } from './employee-exam.component';

describe('EmployeeExamComponent', () => {
  let component: EmployeeExamComponent;
  let fixture: ComponentFixture<EmployeeExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
