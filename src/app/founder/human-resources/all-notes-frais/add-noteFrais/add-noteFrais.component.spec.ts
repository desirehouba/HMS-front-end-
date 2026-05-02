import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddNoteFraiComponent } from './add-noteFrais.component';

describe('AddNoteFraiComponent', () => {
  let component: AddNoteFraiComponent;
  let fixture: ComponentFixture<AddNoteFraiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNoteFraiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteFraiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
