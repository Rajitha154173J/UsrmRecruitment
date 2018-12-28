import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecProcessComponent } from './rec-process.component';

describe('RecProcessComponent', () => {
  let component: RecProcessComponent;
  let fixture: ComponentFixture<RecProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
