import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Vouchers } from 'src/app/core/models/vouchers.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  vouchers: Vouchers;
}

@Component({
  selector: 'app-about-voucher',
  templateUrl: './about-voucher.component.html',
  styleUrls: ['./about-voucher.component.scss'],
})
export class VouchersAboutVoucherComponent {
  dialogTitle: string;
  vouchers: Vouchers;
  voucherForm: UntypedFormGroup; 
  loading = false; 
  payment = false; 
  constructor(
    public dialogRef: MatDialogRef<VouchersAboutVoucherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private servicesService : ServicesService,
    private fb: UntypedFormBuilder,
  ) {
    this.dialogTitle = data.vouchers.name;
    this.vouchers = data.vouchers; 
    this.voucherForm = this.fb.group({ 
      payment_mode: ['', [Validators.required]],
      amount: ['', [Validators.required]], 
      date: ['', [Validators.required]],
    });
  }

  vouchersActions(data : string) {
    this.loading = true;
    const voucherData = {
      supplier_id: this.vouchers.supplier.id,
      responsible_id: this.vouchers.responsible.id,
      description : this.vouchers.description,
      priority : this.vouchers.priority,
      quotation_file : this.vouchers.quotation_file,
      status : data,
      articles : this.vouchers.articles
    }; 
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.vouchers[0],
      this.vouchers.id, voucherData
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

  getCashin( ){
    this.payment = true
  }

  get f() {
    return this.voucherForm.controls;
  } 
  // consommation de api de creation d'un privilige
  /* addCashIn() {
    // stockage des données du formulaire dans un objet
    // de type customer qui sera envoyé a api
    const customerData = { 
      status: "paid",
      purchase_order_id: this.vouchers.id,
      responsible_id: this.vouchers.responsible.id, 
      validation_date: formatDate(this.f['date'].value,'YYYY-MM-dd', 'en-US'),
      payment_method: this.f['payment_mode'].value,
      service_id: 1,
      amount: this.vouchers.total_amount,
    };
    this.loading = true; 

    this.servicesService.addObjets(
      this.servicesService.route.orders[0], customerData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  } */
}
    