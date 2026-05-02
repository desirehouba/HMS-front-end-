import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutFeesComponent } from './about-fees.component';

describe('AboutFeesComponent', () => {
  let component: AboutFeesComponent;
  let fixture: ComponentFixture<AboutFeesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
