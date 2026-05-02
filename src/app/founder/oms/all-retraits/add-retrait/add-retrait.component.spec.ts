import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddRetraitComponent } from './add-retrait.component';

describe('AddRetraitComponent', () => {
  let component: AddRetraitComponent;
  let fixture: ComponentFixture<AddRetraitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
