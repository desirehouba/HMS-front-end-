import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPermissionComponent } from './add-permission.component';

describe('AddPermissionComponent', () => {
  let component: AddPermissionComponent;
  let fixture: ComponentFixture<AddPermissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
