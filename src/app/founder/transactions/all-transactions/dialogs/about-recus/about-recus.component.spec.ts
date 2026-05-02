import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutRecusComponent } from './about-recus.component';

describe('AboutRecusComponent', () => {
  let component: AboutRecusComponent;
  let fixture: ComponentFixture<AboutRecusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRecusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRecusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
