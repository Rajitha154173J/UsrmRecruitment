import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateExamComponent } from './evaluate-exam.component';

describe('EvaluateExamComponent', () => {
  let component: EvaluateExamComponent;
  let fixture: ComponentFixture<EvaluateExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
