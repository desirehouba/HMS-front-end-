import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddArticleMovementComponent } from './add-articleMovement.component';

describe('AddArticleMovementComponent', () => {
  let component: AddArticleMovementComponent;
  let fixture: ComponentFixture<AddArticleMovementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
