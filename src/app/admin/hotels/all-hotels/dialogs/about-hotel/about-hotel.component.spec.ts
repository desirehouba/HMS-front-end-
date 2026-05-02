import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutHotelComponent } from './about-hotel.component';

describe('AboutHotelComponent', () => {
  let component: AboutHotelComponent;
  let fixture: ComponentFixture<AboutHotelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
