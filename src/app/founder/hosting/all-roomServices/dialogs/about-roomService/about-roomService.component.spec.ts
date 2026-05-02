import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutRoomServiceComponent } from './about-roomService.component';

describe('AboutRoomServiceComponent', () => {
  let component: AboutRoomServiceComponent;
  let fixture: ComponentFixture<AboutRoomServiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRoomServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRoomServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
