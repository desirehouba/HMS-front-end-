import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Events } from 'src/app/core/models/events.model';

export interface DialogData {
  id: number;
  action: string;
  events: Events;
}

@Component({
  selector: 'app-about-event',
  templateUrl: './about-event.component.html',
  styleUrls: ['./about-event.component.scss'],
})
export class AboutEventComponent {
  dialogTitle: string;
  events: Events;
  constructor(
    public dialogRef: MatDialogRef<AboutEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    // Set the defaults
    this.dialogTitle = data.events.name;
    this.events = data.events;
  }
  
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
