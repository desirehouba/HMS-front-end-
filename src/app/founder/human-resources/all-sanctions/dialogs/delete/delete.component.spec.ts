import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteDialogSanctionComponent } from './delete.component';

describe('DeleteDialogSanctionComponent', () => {
  let component: DeleteDialogSanctionComponent;
  let fixture: ComponentFixture<DeleteDialogSanctionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogSanctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
