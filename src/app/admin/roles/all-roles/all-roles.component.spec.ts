import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllRolesComponent } from './all-roles.component';

describe('AllRolesComponent', () => {
  let component: AllRolesComponent;
  let fixture: ComponentFixture<AllRolesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
