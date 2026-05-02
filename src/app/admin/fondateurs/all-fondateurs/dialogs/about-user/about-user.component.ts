import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fondateurs } from 'src/app/core/models/fondateurs.model';

export interface DialogData {
  id: number;
  action: string;
  fondateurs: Fondateurs;
}

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutUserComponent {
  dialogTitle: string;
  fondateurs: Fondateurs;
  image : any;
  constructor(
    public dialogRef: MatDialogRef<AboutUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    // Set the defaults
    this.image = environment.imageDirectoryPatchs+data.fondateurs.photo
    this.dialogTitle = data.fondateurs.name;
    this.fondateurs = data.fondateurs;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
