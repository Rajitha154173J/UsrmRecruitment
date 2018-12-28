import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamEventComponent } from './view-exam-event.component';

describe('ViewExamEventComponent', () => {
  let component: ViewExamEventComponent;
  let fixture: ComponentFixture<ViewExamEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExamEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExamEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
