import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllFondateursComponent } from './all-fondateurs.component';

describe('AllFondateursComponent', () => {
  let component: AllFondateursComponent;
  let fixture: ComponentFixture<AllFondateursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFondateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFondateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
