import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutSupplyDemandComponent } from './about-supplyDemand.component';

describe('AboutSupplyDemandComponent', () => {
  let component: AboutSupplyDemandComponent;
  let fixture: ComponentFixture<AboutSupplyDemandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSupplyDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSupplyDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
