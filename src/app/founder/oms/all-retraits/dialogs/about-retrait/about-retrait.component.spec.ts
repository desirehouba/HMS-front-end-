import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutRetraitComponent } from './about-retrait.component';

describe('AboutRetraitComponent', () => {
  let component: AboutRetraitComponent;
  let fixture: ComponentFixture<AboutRetraitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
