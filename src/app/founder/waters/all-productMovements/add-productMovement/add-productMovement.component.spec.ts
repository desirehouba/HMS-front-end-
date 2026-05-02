import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddProductMovementComponent } from './add-productMovement.component';

describe('AddProductMovementComponent', () => {
  let component: AddProductMovementComponent;
  let fixture: ComponentFixture<AddProductMovementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
