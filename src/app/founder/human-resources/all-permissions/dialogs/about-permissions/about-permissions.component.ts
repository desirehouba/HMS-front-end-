import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Permissions } from 'src/app/core/models/permissions.model';

export interface DialogData {
  id: number;
  action: string;
  permissions: Permissions;
}

@Component({
  selector: 'app-about-permissions',
  templateUrl: './about-permissions.component.html',
  styleUrls: ['./about-permissions.component.scss'],
})
export class AboutPermissionsComponent {
  dialogTitle: string;
  permissions: Permissions;
  constructor(
    public dialogRef: MatDialogRef<AboutPermissionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.permissions.name;
    this.permissions = data.permissions;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
