import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticleDeleteDialogComponent } from './delete.component';

describe('ArticleDeleteDialogComponent', () => {
  let component: ArticleDeleteDialogComponent;
  let fixture: ComponentFixture<ArticleDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
