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
import { ValidFormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-add-retrait',
  templateUrl: './add-retrait.component.html',
  styleUrls: ['./add-retrait.component.scss'],
})
export class AddRetraitComponent/* 
  extends UnsubscribeOnDestroyAdapter 
  implements OnInit */ {
  retraitForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Transaction',
      items: ['Transaction'],
      active: 'Add Transaction',
    },
  ];
  status!: number;
  schools: any[] = [];
  school!: any;
  loading = false;
  sommeOM: any = {
    rib: 'test',
    numero_retrait: '693 620 463',
    sommeRetire_1: 0,
    sommeTotal_1: 0,
    sommeTotalDisponible: 0,
    sommeEnCaisse: 0,
    schools : []
  };
  hide = false;
  vide = false;
  idSch = 0;
  idTrans!:any
  paylaods!: any
    
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
  }
  onSubmit() {
    console.log('Form Value', this.retraitForm.value);
  }

  ngOnInit(): void {
    //this.getSchoolss();
    this.getStatOM();
  }

  /* getPaiementType(): void {
    this.vide = true;
    this.school = this.retraitForm.get("school")?.value
  } */

  action(school : any) {
    this.idSch = school.id
    this.school = school
    this.vide = true;
  }

  getStatOM() {
    if (this.authService.currentUserValue.role != "Founder") {
      this.paylaods = {
        idSchool : this.f['school'].value.id,
      }
    }
    this.servicesService.getObjetss(
      this.servicesService.route.statsOM[0], this.paylaods
    ).subscribe({
      next: (res) => {
        console.log(res.data);
        this.sommeOM = res.data;
        this.schools = res.data.schools
        this.hide = true;
      },
      error: (error) => {
        this.hide = true;
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }

  get f() {
    return this.retraitForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/oms/all-retraits"]
    );
  }

  getStatus(id: number) {
    const dialogRef = this.dialog.open(
    ValidFormDialogComponent, {
      data: { idTrans: id },
    });
    /* this.subs.sink = dialogRef.afterClosed()
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
    }); */
  }

  addRetraits() {
    if (this.f['amount'].value > this.school.sommeTotalDisponible) {
      this.servicesService.showCustomPositionEchec('le montant est superieur a ce qui est disponible');
    } else {
      const payload = {
        montant_retrait_net : this.f['amount'].value,
        montant_retrait_brut : this.f['amount'].value,
        mode_retrait: this.f['mode_retrait'].value,
        date: formatDate(Date.now(),'dd-MM-YYYY HH:mm', 'en-US'),
        idUser : this.authService.currentUserValue.id,
        idSchool : this.school.id,
      };
      console.log(payload);
      
      this.loading = true;
      this.servicesService.getObjetss(
        this.servicesService.route.retraitsOM[0], payload
      ).subscribe({
        next: (res) => {
          this.loading = false;
          this.idTrans =  res.data.id
          //this.getStatus(res.data.id)
        },
        error: (error) => {
          this.loading = false;
          this.servicesService.showCustomPositionEchec(error);
        },
      });
    }
  }
}
