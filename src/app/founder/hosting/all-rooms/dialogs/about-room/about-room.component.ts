import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Rooms } from 'src/app/core/models/rooms.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  rooms: Rooms;
}

@Component({
  selector: 'app-about-room',
  templateUrl: './about-room.component.html',
  styleUrls: ['./about-room.component.scss'],
})
export class AboutRoomComponent {
  dialogTitle: string;
  rooms: Rooms;
  image!:any
  constructor(
    public dialogRef: MatDialogRef<AboutRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.rooms.name;
    this.rooms = data.rooms;
    this.image = environment.imageDirectoryPatchs

    console.log(this.image+this.rooms.image);
    
  }
}
