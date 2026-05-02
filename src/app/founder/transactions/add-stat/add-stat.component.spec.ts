import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddStatComponent } from './add-stat.component';

describe('AddStatComponent', () => {
  let component: AddStatComponent;
  let fixture: ComponentFixture<AddStatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
