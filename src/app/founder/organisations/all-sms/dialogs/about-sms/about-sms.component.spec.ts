import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutTasksComponent } from './about-tasks.component';

describe('AboutTasksComponent', () => {
  let component: AboutTasksComponent;
  let fixture: ComponentFixture<AboutTasksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
