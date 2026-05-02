import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionsDeleteDialogComponent } from './delete.component';

describe('PermissionsDeleteDialogComponent', () => {
  let component: PermissionsDeleteDialogComponent;
  let fixture: ComponentFixture<PermissionsDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
