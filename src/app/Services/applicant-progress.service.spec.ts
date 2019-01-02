import { TestBed } from '@angular/core/testing';

import { ApplicantProgressService } from './applicant-progress.service';

describe('ApplicantProgressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicantProgressService = TestBed.get(ApplicantProgressService);
    expect(service).toBeTruthy();
  });
});
