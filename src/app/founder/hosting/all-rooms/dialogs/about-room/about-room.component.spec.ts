import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutRoomComponent } from './about-room.component';

describe('AboutRoomComponent', () => {
  let component: AboutRoomComponent;
  let fixture: ComponentFixture<AboutRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
