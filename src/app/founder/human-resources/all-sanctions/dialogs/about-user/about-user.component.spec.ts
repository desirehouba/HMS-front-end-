import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutSanctionComponent } from './about-user.component';

describe('AboutSanctionComponent', () => {
  let component: AboutSanctionComponent;
  let fixture: ComponentFixture<AboutSanctionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSanctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
