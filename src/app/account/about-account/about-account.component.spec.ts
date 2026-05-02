import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AboutAccountComponent } from './about-account.component';
describe('SigninComponent', () => {
  let component: AboutAccountComponent;
  let fixture: ComponentFixture<AboutAccountComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AboutAccountComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
