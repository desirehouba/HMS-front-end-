import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutHolidaysComponent } from './about-holidays.component';

describe('AboutHolidaysComponent', () => {
  let component: AboutHolidaysComponent;
  let fixture: ComponentFixture<AboutHolidaysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
