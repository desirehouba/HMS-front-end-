import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteBookingsDialogComponent } from './delete.component';

describe('DeleteBookingsDialogComponent', () => {
  let component: DeleteBookingsDialogComponent;
  let fixture: ComponentFixture<DeleteBookingsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBookingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
