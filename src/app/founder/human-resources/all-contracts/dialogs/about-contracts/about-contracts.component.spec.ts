import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutContractsComponent } from './about-contracts.component';

describe('AboutContractsComponent', () => {
  let component: AboutContractsComponent;
  let fixture: ComponentFixture<AboutContractsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
