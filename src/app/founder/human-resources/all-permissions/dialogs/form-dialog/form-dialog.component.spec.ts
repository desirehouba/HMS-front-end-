import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionsFormDialogComponent } from './form-dialog.component';

describe('PermissionsFormDialogComponent', () => {
  let component: PermissionsFormDialogComponent;
  let fixture: ComponentFixture<PermissionsFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
