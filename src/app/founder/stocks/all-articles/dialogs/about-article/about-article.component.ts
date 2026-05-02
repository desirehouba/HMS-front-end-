import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Articles } from 'src/app/core/models/articles.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  articles: Articles;
}

@Component({
  selector: 'app-about-article',
  templateUrl: './about-article.component.html',
  styleUrls: ['./about-article.component.scss'],
})
export class AboutArticleComponent {
  dialogTitle: string;
  articles: Articles;
  image : any
  constructor(
    public dialogRef: MatDialogRef<AboutArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    // Set the defaults
    this.dialogTitle = data.articles.name;
    this.articles = data.articles;
    this.image = environment.imageDirectoryPatchs
  }
  
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
