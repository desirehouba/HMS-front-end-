import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllArticleMovementsComponent } from './all-articleMovements.component';

describe('AllArticleMovementsComponent', () => {
  let component: AllArticleMovementsComponent;
  let fixture: ComponentFixture<AllArticleMovementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllArticleMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArticleMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
