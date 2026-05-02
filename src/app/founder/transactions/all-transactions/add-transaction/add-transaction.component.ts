import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Invoices } from 'src/app/core/models/invoices.model';
import { Teachers } from 'src/app/core/models/teachers.model';
import { Router } from '@angular/router';
import { Students } from 'src/app/core/models/students.model';

import jsPDF from 'jspdf'
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent {
  transactionForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Transaction',
      items: ['Transaction'],
      active: 'Add Transaction',
    },
  ];
  types = ['Bill payment', 'Salary payment', 'Pension Payment']
  payment_modes = ['Cash','Credit card'];
  invoices : Invoices[] = [];
  pensions : any[] = [];
  tranches : any[] = [];
  status!: number;
  teachers: Teachers[] = [];
  students: Students[] = [];
  studentss: Students[] = [];
  filterStudents: Students[] = [];
  filterStudentss: Students[] = [];
  loading = false;
  pension!: any
  recus : any[] = [];
  recusFee : any ;
  totalAmountPaid = 0;
  valid = false;
  validFee = false;
  classe : string = ""
  logo: any = "";
  penr! : boolean;
  feer! : boolean;
  clas = false;
  feess = false;
  bourse!: any;
  bourse_all!: any;
  amout_bourse: any = 0;
  restePension: any = 0;
  alreadyPaid: any = 0;
  resteFee: any = 0;
  paidFee : any = 0;
  fees: any[] = [];
  scholar_level : any
  ecole: any ;
  listStude!: boolean;
  listStudes! : boolean;
  qrObject !: any
  @ViewChild('content', {static:false}) el!: ElementRef
  onInputChange(event: any) {

    const searchInput = event.target.value.toLowerCase();
    this.filterStudents = this.students.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChange(searchInput: any) {
    searchInput.value = "";
    this.filterStudents = this.students;
  }

  onInputChangeJuniors(event: any) {
    const searchInput = event.target.value.toLowerCase();
    this.filterStudentss = this.studentss.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChangeJuniors(searchInput: any) {
    searchInput.value = "";
    this.filterStudentss = this.studentss;
  }
  constructor(
    private fb: UntypedFormBuilder,
    private transactionsService: TransactionsService,
    private authService : AuthService,
    private router : Router,
    public translateService : TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.transactionForm = this.fb.group({
      payment_mode: ['', [Validators.required]],
      payment_date: [''],
      classroom: [''],
      student: ['', [Validators.required]],
      teacher: [''],
      amount: [0, [Validators.required]],
      reasons: [''],
      level: [''],
      type: [''],
      fee: [''],
      use_bouse: [''],
      operator: [''],
      paymentDate: [''],
      receiptNumber: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.transactionForm.value);
  }

  ngOnInit(): void {
    this.ecole = localStorage.getItem("rtr");
    if (localStorage.getItem("rtr") === 'juniors' || localStorage.getItem("rtr") === 'acf' || localStorage.getItem("rtr") === 'uard') {
      this.getStudentssJuniors();
    }
    this.getAllClassess();
    this.logo = "assets/logo/" + localStorage.getItem('logo');
    this.scholar_level = this.authService.currentUserValue.scholar_level;
  }

  getPaiementType(): void {
    if (this.transactionForm.get("type")?.value === 1 ) {
      this.status = 1;
    } else if (this.transactionForm.get("type")?.value === 2 ) {
      this.status = 2;
    }
  }

  getBalanceanys(): void {
    if (this.f['student'].value != ''
      && this.f['student'].value != null 
    ) {
      const paylaod = {
        idStudent : this.f['student'].value.id,
      }
      this.penr = false;
      this.servicesService.getBalancePension2(paylaod)
      .subscribe({
        next: (res) => {
          this.restePension = res.message;
          this.alreadyPaid = res.alreadyPaid;
          this.pension = res.total;
          this.penr = true
        },
      });
    }
  }

  getBalanceFeess(): void  {
    if (this.transactionForm.get("type")?.value === 2
      && this.f['student'].value != '' 
      && this.f['student'].value != null
      && this.f['fee'].value != '' 
      && this.f['fee'].value != null
    ) {
      const paylaod = {
        idSchool : this.f['student'].value.idSchool,
        idSection : this.f['student'].value.idSection,
        idStudent : this.f['student'].value.id,
        idLevel: this.f['student'].value.level.id,
        idFee : this.f['fee'].value.id,
      }
      this.feer = false;
      this.paidFee = this.f['fee'].value.price;
      this.servicesService.balanceFeeUserss(paylaod)
      .subscribe({
        next: (res) => {
          this.resteFee = res.montantRestant;
          this.feer = true;
        },
      });
    }
  }

  getBourse() {
    if (this.f['use_bouse'].value === 'yes') {
      if (this.f['student'].value.bourse != null) {
        this.bourse = this.f['student'].value.bourse.id
        this.amout_bourse = this.f['student'].value.bourse.amount
        this.bourse_all = this.f['student'].value.bourse
      }
    } else {
      this.bourse_all = null
      this.bourse = null
      this.amout_bourse = 0
    }
  }

  getAllClassess(): void {
    
  }

  /* getAllanys(): void {
    let paylaod : any
    if (this.ecole === 'juniors' || this.ecole === 'acf') {
      paylaod = {
        idSchool : this.f['student'].value.idSchool,
        idSection : this.f['student'].value.idSection.id,
        idLevel: this.f['student'].value.level.id,
      } 
    } else {
      paylaod = {
        idSchool : this.f['classroom'].value.idSchool,
        idSection : this.f['classroom'].value.idSection.id,
        idLevel: this.f['classroom'].value.level.id,
      } 
    }
    this.servicesService.getanys(paylaod)
    .subscribe({
      next: (res) => {
        this.pensions = res.data;
        this.getBalanceanys();
      },
    });
  } */

  getAllFeess(): void {
    this.feess = true
    let paylaod: any;
    if (this.ecole === 'juniors' || this.ecole === 'acf' || this.ecole === 'uard') {
      paylaod = {
        idSchool : this.f['student'].value.idSchool,
        idSection : this.f['student'].value.idSection.id,
        idLevel: this.f['student'].value.level.id,
      } 
    } else {
      paylaod = {
        idSchool : this.f['classroom'].value.idSchool,
        idSection : this.f['classroom'].value.idSection.id,
        idLevel: this.f['classroom'].value.level.id,
      } 
    }
    this.servicesService.getFeess(paylaod)
    .subscribe({
      next: (res) => {
        this.fees = res.data;
        this.feess = false
      },
    });
  }

  getAllTranchess(): void {
    const paylaod = {
      idSchool : this.pensions[0].idSchool,
      idSection : this.pensions[0].idSection,
      idPension : this.pensions[0].id
    }
    this.servicesService.getTranchess(paylaod)
    .subscribe({
      next: (res) => {
        this.tranches = res.data;
      },
    });
  }

  getStudentss() {
    const paylaod = {
      idSchool : this.f['classroom'].value.idSchool,
      idSection : this.f['classroom'].value.idSection.id,
      role_id : 8,
      idClasse : this.f['classroom'].value.id,
    }
    this.listStude = true;
    this.servicesService.getStudentss(paylaod)
    .subscribe({
      next: (res) => {
        this.students = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.students = this.students.sort(SortArray);
        this.filterStudents = this.students.sort(SortArray);
        this.listStude = false;
      },
    });
  }

  getStudentssJuniors() {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
      role_id : 8,
    }
    this.listStudes = true;
    this.servicesService.getStudentss(paylaod)
    .subscribe({
      next: (res) => {
        this.studentss = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.studentss = this.studentss.sort(SortArray);
        this.filterStudentss = this.studentss.sort(SortArray);
        this.listStudes = false;
      },
    });
  }

  get f() {
    return this.transactionForm.controls;
  }

  cancel() {
    this.router.navigate([
      "/founder/transactions/all-transactions"
    ]);
  }

  addTransactions() {
    const payload = {
      paymentDate: this.f['paymentDate'].value,
      receiptNumber: this.f['receiptNumber'].value,
      operator: this.f['operator'].value,
      payment_mode: this.f['payment_mode'].value,
      advancePayment: this.f['amount'].value,
      idStudent: this.f['student'].value.id,
      idBourse : this.bourse,
    };
    this.totalAmountPaid = 0;
    this.loading = true;
    this.classe = this.f['classroom'].value.name
    this.transactionsService.findProgressions(payload)
    .subscribe({
      next: (res) => {
        this.recus = res.data;
        this.loading = false;
        if (res.message){
          this.servicesService.showCustomPositionEchec(res.message);
        } else {
          const date = Date.now(); 
          this.qrObject = 'id:'+this.recus[0].student.id+'/'+this.recus[0].student.name+'/'+date
          this.penr = false;
          this.servicesService.showCustomPosition();
          this.valid = true
          for( let i of this.recus){
            this.totalAmountPaid = this.totalAmountPaid + i.advancePayment;
          }
          this.f['student'].reset();
          this.f['amount'].reset();
          if(this.valid === true){
            setTimeout(() => {
              this.makePDF();
            }, 1000)
          }
        };
      },
      error: (error) => {
        this.loading = false;
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  addTransactionFees(){
    const payload = {
      paymentDate: this.f['paymentDate'].value,
      receiptNumber: this.f['receiptNumber'].value,
      operator: this.f['operator'].value,
      payment_mode: this.f['payment_mode'].value,
      advancePayment: this.f['amount'].value,
      idStudent: this.f['student'].value.id,
      idFee: this.f['fee'].value.id,
      idPension: null,
      idLevel: this.f['student'].value.level.id,
      idSection : this.f['student'].value.idSection,
      idSchool : this.f['student'].value.idSchool,
    };
    this.loading = true;
    this.classe = this.f['student'].value.classe.name
    this.servicesService.AddFeeUserss(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.message){
          this.servicesService.showCustomPositionEchec(res.message);
        } else {
          const date = Date.now(); 
          this.qrObject = 'id:'+res.data.FeePaye.student.id+'/'+res.data.FeePaye.student.name+'/'+date
          this.feer = false;
          this.servicesService.showCustomPosition();
          this.recusFee = res.data.FeePaye;
          this.validFee = true
          this.f['amount'].reset();
          if(this.validFee === true){
            setTimeout(() => {
              this.makePDFFee();
            }, 1000)
          }
        };
      },
      error: (error) => {
        this.loading = false;
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  makePDF(){
    let pdf = new jsPDF()
    pdf.html(this.el.nativeElement,{
      callback: (pdf) => {
        pdf.save("recu_"+this.recus[0].student.name+".pdf");
        this.valid = false
      }
    })
  }

  makePDFFee(){
    let pdf = new jsPDF()
    pdf.html(this.el.nativeElement,{
      callback: (pdf) => {
        pdf.save("recu_"+this.recusFee.student.name+".pdf");
        this.validFee = false
      }
    })
  }

}
