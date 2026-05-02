import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { NoteFrais } from 'src/app/core/models/noteFrais.model';

export interface DialogData {
  id: number;
  action: string;
  notesFrais: NoteFrais;
}

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutUserComponent {
  dialogTitle: string;
  notesFrais: NoteFrais;
  constructor(
    public dialogRef: MatDialogRef<AboutUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogTitle = data.notesFrais.libelle;
    this.notesFrais = data.notesFrais;
  }
}
