import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecApplicantComponent } from './rec-applicant.component';

describe('RecApplicantComponent', () => {
  let component: RecApplicantComponent;
  let fixture: ComponentFixture<RecApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
