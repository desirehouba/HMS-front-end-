import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeRoomsDeleteDialogComponent } from './delete.component';

describe('TypeRoomsDeleteDialogComponent', () => {
  let component: TypeRoomsDeleteDialogComponent;
  let fixture: ComponentFixture<TypeRoomsDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRoomsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRoomsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
