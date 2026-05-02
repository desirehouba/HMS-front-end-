import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutRecuComponent } from './about-recu.component';

describe('AboutRecuComponent', () => {
  let component: AboutRecuComponent;
  let fixture: ComponentFixture<AboutRecuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRecuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
