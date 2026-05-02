import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractsDeleteDialogComponent } from './delete.component';

describe('ContractsDeleteDialogComponent', () => {
  let component: ContractsDeleteDialogComponent;
  let fixture: ComponentFixture<ContractsDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
