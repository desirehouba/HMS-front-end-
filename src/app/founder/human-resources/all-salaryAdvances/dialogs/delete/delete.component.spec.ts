import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalaryAdvancesDeleteDialogComponent } from './delete.component';

describe('SalaryAdvancesDeleteDialogComponent', () => {
  let component: SalaryAdvancesDeleteDialogComponent;
  let fixture: ComponentFixture<SalaryAdvancesDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryAdvancesDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAdvancesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
