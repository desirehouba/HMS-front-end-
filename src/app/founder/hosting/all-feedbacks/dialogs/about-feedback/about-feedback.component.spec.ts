import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutFeedbackComponent } from './about-feedback.component';

describe('AboutFeedbackComponent', () => {
  let component: AboutFeedbackComponent;
  let fixture: ComponentFixture<AboutFeedbackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
