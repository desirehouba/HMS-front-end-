import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddArticleFormDialogComponent } from './add-article.component';

describe('AddArticleFormDialogComponent', () => {
  let component: AddArticleFormDialogComponent;
  let fixture: ComponentFixture<AddArticleFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
