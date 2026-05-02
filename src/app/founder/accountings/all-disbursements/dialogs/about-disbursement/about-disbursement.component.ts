import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Disbursements } from 'src/app/core/models/disbursements.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  disbursements: Disbursements;
}

@Component({
  selector: 'app-about-disbursement',
  templateUrl: './about-disbursement.component.html',
  styleUrls: ['./about-disbursement.component.scss'],
})
export class AboutDisbursementComponent {
  dialogTitle: string;
  loading = false;
  voucher = false 
  image!:any
  vouchers:any = []
  disbursements: Disbursements;
  constructor(
    public dialogRef: MatDialogRef<AboutDisbursementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService : AuthService,
    private servicesService : ServicesService
  ) {
    this.dialogTitle = data.disbursements.reference;
    this.disbursements = data.disbursements;
    this.image = environment.imageDirectoryPatchs
  }
  open(){
    open(this.image+this.disbursements.invoice_image);
  }

  getUserss() {
    this.voucher = true
    const paylaod = {
      role_types : ["Direction", "Staffs"]
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.vouchers = res.data;
        this.voucher = false 
      },
    });
  }
  updateOrders(data:any) {
    let purchase_order
    if(this.disbursements.purchase_order!= null) {
      purchase_order = this.disbursements.purchase_order.id
    }
    this.loading = true;
    const disbursementData = {
      invoice_image: this.disbursements.invoice_image,
      expense_type_id: this.disbursements.expense_type_id.id,
      disbursement_date:formatDate(this.disbursements.disbursement_date,'YYYY-MM-dd', 'en-US'),
      payment_method:this.disbursements.payment_method,
      total_amount:this.disbursements.total_amount,
      responsible_id:this.disbursements.responsible.id,
      reasons :this.disbursements.reasons,
      purchase_order_id:purchase_order,
      status:data
    }; 
    
    
    this.servicesService.updateObjets(
      this.servicesService.route.disbursements[0],
      this.disbursements.id, disbursementData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec('une erreur est survenu');
      },
    });
  }
}
