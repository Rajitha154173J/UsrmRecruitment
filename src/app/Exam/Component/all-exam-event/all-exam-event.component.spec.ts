import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExamEventComponent } from './all-exam-event.component';

describe('AllExamEventComponent', () => {
  let component: AllExamEventComponent;
  let fixture: ComponentFixture<AllExamEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllExamEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExamEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
