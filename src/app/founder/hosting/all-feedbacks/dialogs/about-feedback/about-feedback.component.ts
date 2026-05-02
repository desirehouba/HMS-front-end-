import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Feedbacks } from 'src/app/core/models/feedbacks.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  feedbacks: Feedbacks;
}

@Component({
  selector: 'app-about-feedback',
  templateUrl: './about-feedback.component.html',
  styleUrls: ['./about-feedback.component.scss'],
})
export class AboutFeedbackComponent {
  dialogTitle: string;
  feedbacks: Feedbacks;
  image : any
  constructor(
    public dialogRef: MatDialogRef<AboutFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    // Set the defaults
    this.dialogTitle = data.feedbacks.name;
    this.feedbacks = data.feedbacks;
    this.image = environment.imageDirectoryPatchs
  }
  
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
