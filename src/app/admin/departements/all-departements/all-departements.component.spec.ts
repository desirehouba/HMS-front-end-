import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllDepartementsComponent } from './all-departements.component';

describe('AllDepartementsComponent', () => {
  let component: AllDepartementsComponent;
  let fixture: ComponentFixture<AllDepartementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDepartementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
