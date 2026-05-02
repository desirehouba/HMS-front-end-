import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllSanctionsComponent } from './all-sanctions.component';

describe('AllSanctionsComponent', () => {
  let component: AllSanctionsComponent;
  let fixture: ComponentFixture<AllSanctionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSanctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSanctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
