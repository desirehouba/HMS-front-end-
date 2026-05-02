import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AboutNotificationsComponent } from './about-notifications.component';
describe('SigninComponent', () => {
  let component: AboutNotificationsComponent;
  let fixture: ComponentFixture<AboutNotificationsComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AboutNotificationsComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AboutNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
