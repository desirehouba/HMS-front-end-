import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import jsPDF from 'jspdf'
import { Transactions } from 'src/app/core/models/transactions.model';
import { AuthService } from 'src/app/core/service/auth.service';

export interface DialogData {
  id: number;
  action: string;
  feesUsers: Transactions;
}

@Component({
  selector: 'app-about-fee',
  templateUrl: './about-fee.component.html',
  styleUrls: ['./about-fee.component.scss'],
})
export class AboutFeeComponent {
  feeUser: Transactions;
  image : any;
  logo: any = "";
  hide = false;
  over = false;
  type!:  String;
  loading = false
  pensions!: any;
  restePension = 0;
  qrObject !: any
  date : any
  scholar_level: any

  @ViewChild('content', {static:false}) el!: ElementRef
  constructor(
    public dialogRef: MatDialogRef<AboutFeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService : AuthService,
  ) {
    this.feeUser = data.feesUsers;
    this.date = Date.now(); 
    this.qrObject = 'id:'+data.feesUsers.student.id+'/'+data.feesUsers.student.name+'/'+this.date
  }
  ngOnInit(): void {
    this.logo = "assets/logo/" + localStorage.getItem('logo');
    this.scholar_level = this.authService.currentUserValue.scholar_level;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  download(type:String) {
    this.over = true;
    this.type = type;
    setTimeout(() => {
      this.makePDF(type);
    }, 10)
  }

  makePDF(type:String) {
    this.loading = true;
    let pdf = new jsPDF()
    if (type === 'a5') {
      pdf = new jsPDF({
        unit: 'px',
        format: [450, 250.89],
        orientation: 'l',
      });
    } else {
      pdf = new jsPDF({
        unit: 'px',
        format: [500, 450],
        orientation: 'p',
      });
    }
    pdf.html(this.el.nativeElement,{
      callback: (pdf) => {
        this.loading = false;
        pdf.save("recu_"+this.feeUser.student.name+".pdf");
        this.dialogRef.close();
      }
    })
  }
}
