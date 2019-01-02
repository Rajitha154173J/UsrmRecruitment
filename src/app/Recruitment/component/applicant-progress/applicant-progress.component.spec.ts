import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantProgressComponent } from './applicant-progress.component';

describe('ApplicantProgressComponent', () => {
  let component: ApplicantProgressComponent;
  let fixture: ComponentFixture<ApplicantProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
