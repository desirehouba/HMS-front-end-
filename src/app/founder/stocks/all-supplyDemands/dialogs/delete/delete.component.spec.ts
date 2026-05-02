import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplyDemandsDeleteDialogComponent } from './delete.component';

describe('SupplyDemandsDeleteDialogComponent', () => {
  let component: SupplyDemandsDeleteDialogComponent;
  let fixture: ComponentFixture<SupplyDemandsDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyDemandsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyDemandsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
