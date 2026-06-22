import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service'; 
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'; 
import { Hotels } from 'src/app/core/models/hotels.model';

@Component({
  selector: 'app-add-retrait',
  templateUrl: './add-retrait.component.html',
  styleUrls: ['./add-retrait.component.scss'],
})
export class AddRetraitComponent {
  retraitForm: UntypedFormGroup;
  codeForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Transaction',
      items: ['Transaction'],
      active: 'Add Transaction',
    },
  ];
  status!: number;
  hotels: Hotels[] = [];
  hotel!: any;
  loading = false;
  sommeOM: any = {
    rib: 'test',
    numero_retrait: '693 620 463',
    sommeRetire_1: 0,
    sommeTotal_1: 0,
    sommeTotalDisponible: 0,
    sommeEnCaisse: 0,
    hotels : []
  };
  statisMomo: any = {
    sommeRetire_1: 0,
    sommeTotal_1: 0,
    sommeTotalDisponible: 0,
    sommeEnCaisse: 0,
    hotels : []
  };
  
  statistique: any[] = [
    {
      id: 1,
      name: 'Orange Money',
      title : "assets/images/banner/om.png",
      amount : 0
    },
    {
      id: 2,
      name: 'Mobile Money',
      title : "assets/images/banner/momo.jpg",
      amount : 0
    },  
  ];
  momo  = false;
  hide = false;
  vide = false;
  confirm=false;
  codeconfirm = false
  idSch = 0; 
  statTrue = 0;
  amount = 0;
  idTrans!:any
  paylaods!: any
  paylaodsMomo!: any
  typeretrait!: any
  ecole!: any
    
  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    public translateService : TranslateService,
    private servicesService : ServicesService,
    public dialog: MatDialog,
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.retraitForm = this.fb.group({
      mode_retrait: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      numero_retrait: [''],
      rib: [''],
      idUser: [''],
      valid: [''],
    });
    this.codeForm = this.fb.group({
      code: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log('Form Value', this.retraitForm.value);
  }

  ngOnInit(): void {
    this.getStatMOMO();
    this.getStatOM();
    this.ecole = localStorage.getItem("rtr");
  }

  actions(data : any) {
    this.statTrue = data.id
    this.typeretrait = data.name
  }

  action(hotel : any) {
    this.idSch = hotel.id
    this.hotel = hotel
    this.vide = true;  
  }

  getStatOM() {
    if (this.authService.currentUserValue.role != "Founder") {
      this.paylaods = {
        hotel_id : this.f['hotel'].value.id,
      }
    }
    this.servicesService.getObjetss(
      this.servicesService.route.payments[2], this.paylaods
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.statistique[0].sommeNet= res.sommeNet
        this.sommeOM = res;
        this.hotels = res.hotels
        this.hide = true;
      },
      error: (error) => {
        this.hide = true;
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  getStatMOMO() {
    if (this.authService.currentUserValue.role != "Founder") {
      this.paylaodsMomo = {
        hotel_id : this.f['hotel'].value.id,
      }
    }
    this.servicesService.getObjetss(
      this.servicesService.route.paymentsMomo[2],
      this.paylaodsMomo
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.statisMomo = res;
        this.statistique[1].sommeNet= res.sommeNet
        this.momo = true;
      },
      error: (error) => {
        this.momo = true;
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  get f() {
    return this.retraitForm.controls;
  }

  get g() {
    return this.codeForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/oms/all-retraits"]
    );
  }

  AllAmount() {
    this.retraitForm.get('amount')?.setValue(this.hotel.sommeNet); 
  }

  /* getStatus(id: number) {
    const dialogRef = this.dialog.open(
    ValidFormDialogComponent, {
      data: { idTrans: id },
    });
    this.subs.sink = dialogRef.afterClosed()
    .subscribe((result) => {
      if (this.f['type'].value === 1) {
        this.recus = JSON.parse(localStorage.getItem('recuPension') || '{}')
        this.valid = true
        for( let i of this.recus){
          this.totalAmountPaid = this.totalAmountPaid + i.advancePayment;
        }
        if(this.valid === true){
          setTimeout(() => { this.makePDF(); }, 1000)
        }
        this.transactionForm.reset();
      } else if (this.f['type'].value === 2) {
        this.recusFee = JSON.parse(localStorage.getItem('recuPension') || '{}')
        this.validFee = true
        if(this.validFee === true){
          setTimeout(() => { this.makePDFFee(); }, 1000)
        }
        this.transactionForm.reset();
      }
    });
  } */

  getStatusMobile() { 
    this.confirm = true;
    this.codeconfirm = true
    const payload = {
      idwithdrawal: this.idTrans,
      code : this.g['code'].value,
    };

    this.servicesService.addObjets(
      this.servicesService.route.withdrawalsconfirm[0], payload
    ).subscribe({
      next: (data) => {
        this.cancel();
        this.confirm = false;
        this.codeconfirm = false
        this.servicesService.showCustomPosition();
      },
      error: (error) => {
        this.loading = false; 
        this.confirm = false;
        this.codeconfirm = false
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  addRetraits() { 
    if (this.f['amount'].value > this.hotel.sommeEnCaisse) {
      this.servicesService.showCustomPositionEchec('le montant est superieur a ce qui est disponible');
    } else {
      const payload = {
        type : this.typeretrait,
        montant_retrait_net : this.f['amount'].value,
        montant_retrait_brut : this.f['amount'].value,
        mode_retrait: this.f['mode_retrait'].value,
        date: formatDate(Date.now(),'dd-MM-yyyy HH:mm', 'en-US'),
        user_id : this.authService.currentUserValue.id,
        hotel_id : this.hotel.hotel_id,
      }; 
      
      this.loading = true;
      this.servicesService.getObjetss(
        this.servicesService.route.retraitsOM[0], payload
      ).subscribe({
        next: (res) => {
          this.confirm = true
          this.loading = false;
          this.idTrans =  res.id 
          this.cancel();
        },
        error: (error) => {
          this.loading = false;
          this.servicesService.showCustomPositionEchec(error);
        },
      });
    }
  }
}
