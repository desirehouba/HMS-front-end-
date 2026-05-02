import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllHotelsComponent } from './all-hotels.component';

describe('AllHotelsComponent', () => {
  let component: AllHotelsComponent;
  let fixture: ComponentFixture<AllHotelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllHotelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
