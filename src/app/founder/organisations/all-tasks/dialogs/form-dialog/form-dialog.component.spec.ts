import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TasksFormDialogComponent } from './form-dialog.component';

describe('TasksFormDialogComponent', () => {
  let component: TasksFormDialogComponent;
  let fixture: ComponentFixture<TasksFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
