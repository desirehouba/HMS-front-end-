import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllPermissionsComponent } from './all-permissions.component';

describe('AllPermissionsComponent', () => {
  let component: AllPermissionsComponent;
  let fixture: ComponentFixture<AllPermissionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
