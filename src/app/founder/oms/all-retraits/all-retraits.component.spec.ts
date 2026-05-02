import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllRetraitsComponent } from './all-retraits.component';

describe('AllRetraitsComponent', () => {
  let component: AllRetraitsComponent;
  let fixture: ComponentFixture<AllRetraitsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRetraitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRetraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
