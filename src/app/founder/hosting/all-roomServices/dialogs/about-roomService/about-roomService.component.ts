import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RoomServices } from 'src/app/core/models/roomServices.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  roomServices: RoomServices;
}

@Component({
  selector: 'app-about-roomService',
  templateUrl: './about-roomService.component.html',
  styleUrls: ['./about-roomService.component.scss'],
})
export class AboutRoomServiceComponent {
  dialogTitle: string;
  roomServices: RoomServices;
  image : any
  constructor(
    public dialogRef: MatDialogRef<AboutRoomServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    // Set the defaults
    this.dialogTitle = data.roomServices.name;
    this.roomServices = data.roomServices;
    this.image = environment.imageDirectoryPatchs
  }
  
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
