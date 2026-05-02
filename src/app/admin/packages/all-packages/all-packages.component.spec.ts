import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllPackagesComponent } from './all-packages.component';

describe('AllPackagesComponent', () => {
  let component: AllPackagesComponent;
  let fixture: ComponentFixture<AllPackagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
