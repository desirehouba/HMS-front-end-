import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutPermissionsComponent } from './about-permissions.component';

describe('AboutPermissionsComponent', () => {
  let component: AboutPermissionsComponent;
  let fixture: ComponentFixture<AboutPermissionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
