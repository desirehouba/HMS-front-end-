import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeRoomsDialogComponent } from './form-dialog.component';

describe('TypeRoomsDialogComponent', () => {
  let component: TypeRoomsDialogComponent;
  let fixture: ComponentFixture<TypeRoomsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRoomsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRoomsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
