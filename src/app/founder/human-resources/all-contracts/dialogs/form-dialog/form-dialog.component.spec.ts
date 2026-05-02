import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractsFormDialogComponent } from './form-dialog.component';

describe('ContractsFormDialogComponent', () => {
  let component: ContractsFormDialogComponent;
  let fixture: ComponentFixture<ContractsFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
