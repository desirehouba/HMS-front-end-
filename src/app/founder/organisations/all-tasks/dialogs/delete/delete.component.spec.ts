import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TasksDeleteDialogComponent } from './delete.component';

describe('TasksDeleteDialogComponent', () => {
  let component: TasksDeleteDialogComponent;
  let fixture: ComponentFixture<TasksDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
