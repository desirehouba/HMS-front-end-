import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedbacksDialogComponent } from './form-dialog.component';

describe('FeedbacksDialogComponent', () => {
  let component: FeedbacksDialogComponent;
  let fixture: ComponentFixture<FeedbacksDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
