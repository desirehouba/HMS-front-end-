import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriesRoomsDeleteDialogComponent } from './delete.component';

describe('CategoriesRoomsDeleteDialogComponent', () => {
  let component: CategoriesRoomsDeleteDialogComponent;
  let fixture: ComponentFixture<CategoriesRoomsDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesRoomsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesRoomsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
