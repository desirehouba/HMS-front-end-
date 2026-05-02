import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Tasks } from 'src/app/core/models/tasks.mode';

export interface DialogData {
  id: number;
  action: string;
  tasks: Tasks;
}

@Component({
  selector: 'app-about-tasks',
  templateUrl: './about-tasks.component.html',
  styleUrls: ['./about-tasks.component.scss'],
})
export class AboutTasksComponent {
  dialogTitle: string;
  tasks: Tasks;
  constructor(
    public dialogRef: MatDialogRef<AboutTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.tasks.name;
    this.tasks = data.tasks;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
