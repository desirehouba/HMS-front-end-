import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedbacksDeleteDialogComponent } from './delete.component';

describe('FeedbacksDeleteDialogComponent', () => {
  let component: FeedbacksDeleteDialogComponent;
  let fixture: ComponentFixture<FeedbacksDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbacksDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
