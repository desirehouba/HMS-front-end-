import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCategoriesRoomComponent } from './add-categoriesRoom.component';

describe('AddCategoriesRoomComponent', () => {
  let component: AddCategoriesRoomComponent;
  let fixture: ComponentFixture<AddCategoriesRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoriesRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoriesRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
