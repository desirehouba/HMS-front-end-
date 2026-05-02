import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeInvoicesDialogComponent } from './form-dialog.component';

describe('TypeInvoicesDialogComponent', () => {
  let component: TypeInvoicesDialogComponent;
  let fixture: ComponentFixture<TypeInvoicesDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeInvoicesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeInvoicesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
