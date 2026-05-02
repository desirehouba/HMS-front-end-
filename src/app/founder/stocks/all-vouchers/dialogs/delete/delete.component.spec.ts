import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VouchersDeleteDialogComponent } from './delete.component';

describe('VouchersDeleteDialogComponent', () => {
  let component: VouchersDeleteDialogComponent;
  let fixture: ComponentFixture<VouchersDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
