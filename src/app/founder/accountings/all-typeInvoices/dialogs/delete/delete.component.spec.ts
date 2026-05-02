import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeInvoicesDeleteDialogComponent } from './delete.component';

describe('TypeInvoicesDeleteDialogComponent', () => {
  let component: TypeInvoicesDeleteDialogComponent;
  let fixture: ComponentFixture<TypeInvoicesDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeInvoicesDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeInvoicesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
