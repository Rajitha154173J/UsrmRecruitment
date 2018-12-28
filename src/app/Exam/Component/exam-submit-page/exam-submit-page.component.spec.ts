import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSubmitPageComponent } from './exam-submit-page.component';

describe('ExamSubmitPageComponent', () => {
  let component: ExamSubmitPageComponent;
  let fixture: ComponentFixture<ExamSubmitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamSubmitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSubmitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
