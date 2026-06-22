import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Retraits } from 'src/app/core/models/retraits.model'; 
import { ServicesService } from 'src/app/core/service/services.service'; 

export interface DialogData {
  id: number;
  action: string;
  retraits: Retraits;
}

@Component({
  selector: 'app-about-retrait',
  templateUrl: './about-retrait.component.html',
  styleUrls: ['./about-retrait.component.scss'],
})
export class AboutRetraitComponent {
  dialogTitle: string;
  retraits: Retraits; 
  loading = false;
  payment = false
  constructor(
    public dialogRef: MatDialogRef<AboutRetraitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private servicesService : ServicesService, 
  ) {
    this.dialogTitle = '';
    this.retraits = data.retraits; 
  }

  retraitsActions(data : string) {
    this.loading = true;
    const retraitData = {
      status : data,
      type : this.retraits.type,
      montant_retrait_net : this.retraits.montant_retrait_net,
      montant_retrait_brut : this.retraits.montant_retrait_net,
      mode_retrait: this.retraits.mode_retrait,
      date: this.retraits.date,
      idUser : this.retraits.user.id,
      idSchool : this.retraits.school.id,
    }; 
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.retraitsOM[0],
      this.retraits.id, retraitData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
