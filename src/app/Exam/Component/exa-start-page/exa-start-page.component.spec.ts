import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaStartPageComponent } from './exa-start-page.component';

describe('ExaStartPageComponent', () => {
  let component: ExaStartPageComponent;
  let fixture: ComponentFixture<ExaStartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaStartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
