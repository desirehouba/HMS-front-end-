import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllPrivilegesComponent } from './all-privileges.component';

describe('AllPrivilegesComponent', () => {
  let component: AllPrivilegesComponent;
  let fixture: ComponentFixture<AllPrivilegesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
