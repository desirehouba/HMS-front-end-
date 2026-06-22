import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SupplyDemandsService } from '../../supplyDemands.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms'; 
import { AuthService } from 'src/app/core/service/auth.service';
;
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { Articles } from 'src/app/core/models/articles.model';
import { SupplyDemands } from '../../../../../core/models/supplyDemands.model';

export interface DialogData {
  id: number;
  action: string;
  supplyDemands: SupplyDemands;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class SupplyDemandsDialogComponent {
  action: string;
  dialogTitle: string;
  supplyDemandForm: UntypedFormGroup;
  supplyDemands: SupplyDemands; 
  loading = false 
  articles: Articles[] = [];
  responsibles: any[] = [];
  suppliers: any[] = []; 
  supplyDemandArrys: any[] = [];
  responsables: any[] = [];
  users: any[] = []; 
  numbersSupplyDemands = [1,2,3,4,5,6,7,8,9,10]
  supplyDemandData: any;
  hide = false; 
  responsable = false;
  supplier = false;
  user = false;
  article = false; 
  constructor(
    public dialogRef: MatDialogRef<SupplyDemandsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public supplyDemandsService: SupplyDemandsService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    public servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action; 
    this.dialogTitle = data.supplyDemands.name;
    this.supplyDemands = data.supplyDemands; 
    this.supplyDemandForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.supplyDemands.id],
      name: [this.supplyDemands.name],
      responsible_id: [this.supplyDemands.responsible.id], 
      nbrSupplyDemand: [this.supplyDemands.articles.length],
      description: [this.supplyDemands.description],
      priority: [this.supplyDemands.priority], 
      status: [this.supplyDemands.status], 
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  } 
  ngOnInit(): void {
    this.getArticless();
    this.getSuppilerss();
    this.getUserss();
    this.getSupplyDemands();
  }


  getArticless() {
    this.article = true;
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool, 
    }
    this.servicesService.getObjetss(
      this.servicesService.route.articles[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.articles = res.data;
        this.article = false;
      },
    });
  }

  getSuppilerss() {
    this.supplier = true;
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      idRole : 4,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.suppliers = res.data;
        this.supplier = false;
      },
    });
  }

  getUserss() {
    this.responsable = true;
    const paylaod = {
      idSchool: this.authService.currentUserValue.idSchool,
      idSection: this.authService.currentUserValue.idSection,
      idRole: 3,
      typeRole: ["Staffs", "Direction"],
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.responsibles = res.data;
        this.responsable = false;
      },
    });
  }

  getSupplyDemands() {
    this.supplyDemandArrys = [];
    for (let supplyDemand = 1; supplyDemand <= this.f['nbrSupplyDemand'].value; supplyDemand++) {
      let paylaod = {
        id: this.supplyDemands.articles[supplyDemand-1]?.id || null,
        quantity : this.supplyDemands.articles[supplyDemand-1]?.quantity || null,
        unit_price: Number(this.supplyDemands.articles[supplyDemand-1]?.unit_price) || null,
        supplier_id: this.supplyDemands.articles[supplyDemand-1]?.supplier_id || null,
      };
      this.supplyDemandArrys.push(paylaod);
    }
    console.log(this.supplyDemandArrys);
    
  }

  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.supplyDemandForm.controls;
  }

  // consommation de api de creation d'un supplyDemand
  updateSupplyDemands(data :  any) {
    // stockage des données du formulaire dans un objet
    // de type supplyDemand qui sera envoyé a api
    let photo = new FormData(); 
    this.loading = true
    let test = true 
    for (let supplyDemand of this.supplyDemandArrys) {
      if ( supplyDemand.id === null || supplyDemand.quantity === null || supplyDemand.supplier_id === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false
      } else{
        test = false
        this.supplyDemandData = {
          name: '.',
          description: this.f['description'].value,
          responsible_id: this.f['responsible_id'].value, 
          priority: this.f['priority'].value,
          articles : this.supplyDemandArrys,
          status: data,
        };
      }
    } 
    this.servicesService.updateObjets(
      this.servicesService.route.supplyDemands[0],
      this.supplyDemands.id, this.supplyDemandData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(
          'un probleme est survenu veillez contactez administration');
      },
    });
  }
}
