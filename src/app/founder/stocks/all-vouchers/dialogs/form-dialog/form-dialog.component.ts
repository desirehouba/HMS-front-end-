import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { VouchersService } from '../../vouchers.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Vouchers } from 'src/app/core/models/vouchers.model';
import { AuthService } from 'src/app/core/service/auth.service';
;
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { Articles } from 'src/app/core/models/articles.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  vouchers: Vouchers;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class VouchersDialogComponent {
  action: string;
  dialogTitle: string;
  voucherForm: UntypedFormGroup;
  vouchers: Vouchers;
  classrooms: any[]= [];;
  teachers: any[]= [];;
  filterTeachers: any[] = [];
  matters: any[]= [];;
  levels: any[]= [];;
  classroom: any = {}
  loading = false 
  
  articles: Articles[] = [];
  voucherArrys: any[] = [];
  responsables: any[] = [];
  users: any[] = [];
  suppliers: any[] = [];
  numbersVouchers = [1,2,3,4,5,6,7,8,9,10]
  voucherData: any;
  hide = false; 
  responsable = false;
  supplier = false;
  user = false;
  article = false;
  scholar_level = "";
  quotation_file: any;
  image: any;
  constructor(
    public dialogRef: MatDialogRef<VouchersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public vouchersService: VouchersService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    public servicesService : ServicesService
  ) {
    // Set the defaults
    this.action = data.action; 
    this.dialogTitle = data.vouchers.name;
    this.vouchers = data.vouchers; 
    this.voucherForm = this.createContactForm();
    this.image = environment.imageDirectoryPatchs;
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]); 
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.vouchers.id],
      name: [this.vouchers.name],
      responsible_id: [this.vouchers.responsible.id],
      supplier_id: [this.vouchers.supplier.id],
      nbrVoucher: [this.vouchers.articles.length],
      description: [this.vouchers.description],
      priority: [this.vouchers.priority],
      quotation_file : [this.vouchers.quotation_file],
      status: [this.vouchers.status],
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
    this.getSupplierss();
    this.getUserss(); 
    this.getVouchers()
  }


  getArticless() {
    this.article = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id, 
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

  getUserss() {
    this.user = true
    const paylaod = {
      role_types : ["Direction", "Staffs"]
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.users = res.data;
        this.user = false
      },
    });
  }

  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  getSupplierss() {
    this.supplier = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      role_id : 4
      //service_id : this.authService.currentUserValue.idSection,
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

  getResponsables() {
    this.responsable = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      role_id : 2/* 
      service_id : this.authService.currentUserValue.idSection, */
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.responsables = res.data;
        this.responsable = false;
      },
    });
  }

  getVouchers() {
    this.voucherArrys = [];
    for (let voucher = 1; voucher <= this.vouchers.articles.length; voucher++) {
      let paylaod = {
        id: this.vouchers.articles[voucher-1]?.id || null,
        unit_price: this.vouchers.articles[voucher-1]?.unit_price || null,
        quantity : this.vouchers.articles[voucher-1]?.quantity || null,
      };
      this.voucherArrys.push(paylaod);
      console.log(this.voucherArrys)
    }
    console.log(this.voucherArrys);
    
  }

  

  get f() {
    return this.voucherForm.controls;
  }

  // consommation de api de creation d'un voucher
  updateVouchers(data:any) {
    // stockage des données du formulaire dans un objet
    // de type voucher qui sera envoyé a api
    let photo = new FormData();
    let image  
    if (this.f['quotation_file'].value === this.vouchers.quotation_file){
      this.quotation_file = this.vouchers.quotation_file;
    } else if (this.f['quotation_file'].value != '' && this.f['quotation_file'].value != undefined){
      let photo = new FormData();
      photo.append(
        "photo", 
        this.f['quotation_file'].value, 
        this.f['quotation_file'].value.name
      );
      this.quotation_file = this.f['quotation_file'].value.name;
      this.servicesService.addphoto(photo).subscribe({
        next: (res) => {}
      });
    }
    this.loading = true
    let test = true 
    for (let voucher of this.voucherArrys) {
      if ( voucher.id === null || voucher.quantity === null || voucher.unit_price === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false
      } else{
        test = false
        this.voucherData = {
          responsible_id: this.f['responsible_id'].value,
          supplier_id: this.f['supplier_id'].value,
          description: this.f['description'].value,
          priority: this.f['priority'].value,
          articles : this.voucherArrys,
          quotation_file : this.quotation_file,
          status: data,
        };
      }
    } 
    this.servicesService.updateObjets(
      this.servicesService.route.vouchers[0],
      this.vouchers.id, this.voucherData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec('un probleme est survenu veillez contactez administration');
      },
    });
  }
}
