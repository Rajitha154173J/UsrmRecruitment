import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayExamComponent } from './essay-exam.component';

describe('EssayExamComponent', () => {
  let component: EssayExamComponent;
  let fixture: ComponentFixture<EssayExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssayExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
