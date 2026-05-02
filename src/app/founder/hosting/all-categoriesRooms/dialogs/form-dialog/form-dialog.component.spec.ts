import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriesRoomsDialogComponent } from './form-dialog.component';

describe('CategoriesRoomsDialogComponent', () => {
  let component: CategoriesRoomsDialogComponent;
  let fixture: ComponentFixture<CategoriesRoomsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesRoomsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesRoomsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
