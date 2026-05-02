import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddFondateurComponent } from './add-fondateur.component';

describe('AddFondateurComponent', () => {
  let component: AddFondateurComponent;
  let fixture: ComponentFixture<AddFondateurComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFondateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFondateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
