import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VouchersDialogComponent } from './form-dialog.component';

describe('VouchersDialogComponent', () => {
  let component: VouchersDialogComponent;
  let fixture: ComponentFixture<VouchersDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
