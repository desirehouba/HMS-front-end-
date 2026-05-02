import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddFeedbackComponent } from './add-feedback.component';

describe('AddFeedbackComponent', () => {
  let component: AddFeedbackComponent;
  let fixture: ComponentFixture<AddFeedbackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
