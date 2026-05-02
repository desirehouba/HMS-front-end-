import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventDeleteDialogComponent } from './delete.component';

describe('EventDeleteDialogComponent', () => {
  let component: EventDeleteDialogComponent;
  let fixture: ComponentFixture<EventDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
