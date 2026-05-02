import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddHotelComponent } from './add-hotel.component';

describe('AddHotelComponent', () => {
  let component: AddHotelComponent;
  let fixture: ComponentFixture<AddHotelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
