import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllProductMovementsComponent } from './all-productMovements.component';

describe('AllProductMovementsComponent', () => {
  let component: AllProductMovementsComponent;
  let fixture: ComponentFixture<AllProductMovementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
