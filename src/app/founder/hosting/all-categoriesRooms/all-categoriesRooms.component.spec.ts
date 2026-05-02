import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllCategoriesRoomsComponent } from './all-categoriesRooms.component';

describe('AllCategoriesRoomsComponent', () => {
  let component: AllCategoriesRoomsComponent;
  let fixture: ComponentFixture<AllCategoriesRoomsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCategoriesRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCategoriesRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
