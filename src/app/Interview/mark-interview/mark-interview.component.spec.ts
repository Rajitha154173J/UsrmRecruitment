import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkInterviewComponent } from './mark-interview.component';

describe('MarkInterviewComponent', () => {
  let component: MarkInterviewComponent;
  let fixture: ComponentFixture<MarkInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
