import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutWarningComponent } from './about-user.component';

describe('AboutWarningComponent', () => {
  let component: AboutWarningComponent;
  let fixture: ComponentFixture<AboutWarningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
