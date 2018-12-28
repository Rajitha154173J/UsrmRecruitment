import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeExamComponent } from './edite-exam.component';

describe('EditeExamComponent', () => {
  let component: EditeExamComponent;
  let fixture: ComponentFixture<EditeExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
