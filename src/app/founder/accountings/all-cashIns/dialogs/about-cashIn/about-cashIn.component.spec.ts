import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutCashInComponent } from './about-cashIn.component';

describe('AboutCashInComponent', () => {
  let component: AboutCashInComponent;
  let fixture: ComponentFixture<AboutCashInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCashInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCashInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
