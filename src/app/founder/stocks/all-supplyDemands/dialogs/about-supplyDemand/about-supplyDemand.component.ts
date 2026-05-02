import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SupplyDemands } from 'src/app/core/models/supplyDemands.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  supplyDemands: SupplyDemands;
}

@Component({
  selector: 'app-about-supplyDemand',
  templateUrl: './about-supplyDemand.component.html',
  styleUrls: ['./about-supplyDemand.component.scss'],
})
export class AboutSupplyDemandComponent {
  dialogTitle: string;
  supplyDemands: SupplyDemands;
  supplyDemandForm: UntypedFormGroup; 
  loading = false;
  payment = false
  constructor(
    public dialogRef: MatDialogRef<AboutSupplyDemandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private servicesService : ServicesService,
    private fb: UntypedFormBuilder,
  ) {
    this.dialogTitle = data.supplyDemands.description;
    this.supplyDemands = data.supplyDemands;
    console.log(this.supplyDemands);
    
    this.supplyDemandForm = this.fb.group({ 
      payment_mode: ['', [Validators.required]],
      amount: ['', [Validators.required]], 
      date: ['', [Validators.required]],
    });
  }

  supplyDemandsActions(data : string) {
    this.loading = true;
    const supplyDemandData = {
      status : 'accepted', 
      description: this.supplyDemands.description,
      responsible_id: this.supplyDemands.responsible.id,
      priority: this.supplyDemands.priority,
      articles : this.supplyDemands.articles,
    }; 
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.supplyDemands[0],
      this.supplyDemands.id, supplyDemandData
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
  // consommation de api de creation d'un privilige
}
