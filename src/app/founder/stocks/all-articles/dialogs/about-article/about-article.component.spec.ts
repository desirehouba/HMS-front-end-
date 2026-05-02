import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutArticleComponent } from './about-article.component';

describe('AboutArticleComponent', () => {
  let component: AboutArticleComponent;
  let fixture: ComponentFixture<AboutArticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
