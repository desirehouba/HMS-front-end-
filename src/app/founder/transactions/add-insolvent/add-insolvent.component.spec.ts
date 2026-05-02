import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddInsolventComponent } from './add-insolvent.component';

describe('AddInsolventComponent', () => {
  let component: AddInsolventComponent;
  let fixture: ComponentFixture<AddInsolventComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsolventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsolventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
