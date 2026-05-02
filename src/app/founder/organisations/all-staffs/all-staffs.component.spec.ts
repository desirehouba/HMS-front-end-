import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllStaffsComponent } from './all-staffs.component';

describe('AllStaffsComponent', () => {
  let component: AllStaffsComponent;
  let fixture: ComponentFixture<AllStaffsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStaffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
