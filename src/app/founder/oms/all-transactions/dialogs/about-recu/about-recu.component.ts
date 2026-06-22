import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import jsPDF from 'jspdf'
import { ServicesService } from 'src/app/core/service/services.service';
import { Transactions } from 'src/app/core/models/transactions.model';/* 
import { Pensions } from 'src/app/core/models/pensions.model'; */
import { AuthService } from 'src/app/core/service/auth.service';

export interface DialogData {
  id: number;
  action: string;
  transaction: Transactions;
}

@Component({
  selector: 'app-about-recu',
  templateUrl: './about-recu.component.html',
  styleUrls: ['./about-recu.component.scss'],
})
export class AboutRecuComponent {
  dialogTitle: string;
  transaction: Transactions;
  image : any;
  logo: any = "";
  ecole: any = "";
  hide = false;
  type!:  string;
  over = false;
  loading = false
  pensions!: any;
  restePension = 0;
  scholar_level : any
  payment = false;
  valider: string = 'app.validation_payment';
  pension!: any
  alreadyPaid: any = 0;

  @ViewChild('content', {static:false}) el!: ElementRef
  constructor(
    public dialogRef: MatDialogRef<AboutRecuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public servicesService: ServicesService,
    private authService : AuthService,
  ) {
      this.dialogTitle = data.transaction?.student?.name;
      this.transaction = data.transaction;
  }

  ngOnInit(): void {
    this.getStatusMobile(this.transaction.id)
  }


  getStatusMobile(id: number) {
    this.payment = true;
    if(this.transaction.payment_mode === 'Mobile Money'){

      this.servicesService.getStatus(
      this.servicesService.route.paymentsMomo[1], id
    ).subscribe({
      next: (data) => {
        this.payment = false;
        if (data.data.status === "SUCCESSFUL") {
          this.servicesService.showCustomPosition();
          this.dialogRef.close(1);
        } else {
          this.servicesService.showCustomPositionEchec("Echec");
          this.dialogRef.close(1);
        }
      },
      error: (error) => {
        this.dialogRef.close(1);
        this.payment = false; 
        if (error.message) {
          this.servicesService.showCustomPositionEchec(error.message);
        } else {
          this.servicesService.showCustomPositionEchec(error);
        }
      },
    });
    } else {
      this.servicesService.getStatus(
        this.servicesService.route.payments[1], id
      ).subscribe({
        next: (data) => {
          this.payment = false;
          if (data.data.status === "SUCCESSFULL") {
            this.servicesService.showCustomPosition();
            this.dialogRef.close(1);
          } else {
            this.servicesService.showCustomPositionEchec("Echec");
            this.dialogRef.close(1);
          }
        },
        error: (error) => {
          this.dialogRef.close(1);
          this.payment = false; 
          if (error.message) {
            this.servicesService.showCustomPositionEchec(error.message);
          } else {
            this.servicesService.showCustomPositionEchec(error);
          }
        },
      });
    }
    
  }
  
  onNoClick(): void {
    this.dialogRef.close(1);
  }
}
