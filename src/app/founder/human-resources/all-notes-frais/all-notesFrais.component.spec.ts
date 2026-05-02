import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllNotesFraisComponent } from './all-notesFrais.component';

describe('AllNotesFraisComponent', () => {
  let component: AllNotesFraisComponent;
  let fixture: ComponentFixture<AllNotesFraisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNotesFraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNotesFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
