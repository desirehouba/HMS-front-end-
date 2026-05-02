import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutOrderComponent } from './about-order.component';

describe('AboutOrderComponent', () => {
  let component: AboutOrderComponent;
  let fixture: ComponentFixture<AboutOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
