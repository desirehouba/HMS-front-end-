import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import jsPDF from 'jspdf'
import { ServicesService } from 'src/app/core/service/services.service';
import { Transactions } from 'src/app/core/models/transactions.model';
import { AuthService } from 'src/app/core/service/auth.service';

export interface DialogData {
  id: number;
  action: string;
  transaction: Transactions[];
}

@Component({
  selector: 'app-about-recus',
  templateUrl: './about-recus.component.html',
  styleUrls: ['./about-recus.component.scss'],
})
export class AboutRecusComponent {
  dialogTitle: string;
  transaction: Transactions[];
  image : any;
  logo: any = "";
  ecole: any = "";
  hide = false;
  type!:  String;
  over = false;
  penr = false;
  avancePension!: any
  alreadyPaid!: any
  loading = false
  pensions!: any;
  pension!: any
  bourse!:any
  restePension !: any
  scholar_level: any
  qrObject !: any
  date : any

  @ViewChild('content', {static:false}) el!: ElementRef
  constructor(
    public dialogRef: MatDialogRef<AboutRecusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public servicesService: ServicesService,
    private authService : AuthService,
  ) {
      this.dialogTitle = data.transaction[0].student.name;
      this.transaction = data.transaction;
      this.date = Date.now(); 
      this.qrObject = 'id:'+data.transaction[0].student.id+'/'+data.transaction[0].student.name+'/'+this.date
  }

  ngOnInit(): void {
    this.ecole = localStorage.getItem("rtr");
    this.logo = "assets/logo/" + localStorage.getItem('logo');
    this.scholar_level = this.authService.currentUserValue.scholar_level;
    this.getBalanceanys();
    this.getBourse()
    this.ordertransaction()
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  getBalanceanys(): void {
    const paylaod = {
      idStudent : this.transaction[0].student.id,
    }
    this.penr = false;
    this.servicesService.getBalancePension2(paylaod)
    .subscribe({
      next: (res) => {
        this.restePension = res.message;
        this.alreadyPaid = res.alreadyPaid;
        this.avancePension = res.alreadyPaid;
        this.pension = res.total;
        this.penr = true
        this.hide = true
      },
    });
  }

  ordertransaction() {
    this.transaction.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  getBourse() {
    for (let i of this.transaction) {
      if (i.bourse != null) {
        this.bourse = i.bourse
      } else {
        this.bourse = null
      }
    }
  }

  download(type :String) {
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
        pdf.save("recu_"+this.transaction[0].student.name+".pdf");
        this.dialogRef.close();
      }
    })
  }
}
