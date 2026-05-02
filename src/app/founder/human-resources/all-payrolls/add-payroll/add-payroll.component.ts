import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { Teachers } from 'src/app/core/models/teachers.model';
import { Customers } from 'src/app/core/models/customers.model';
import { Staffs } from 'src/app/core/models/staffs.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-payroll',
  templateUrl: './add-payroll.component.html',
  styleUrls: ['./add-payroll.component.scss'],
})
export class AddPayrollComponent {
  payrollForm: UntypedFormGroup;
  loading = false;
  hide = true;
  files : any;
  teachers: Teachers[] = [];
  staffs: Staffs[] = [];
  suppliers: Customers[] = [];
  istypepayroll = true
  breadscrums = [
    {
      title: 'Add Payroll',
      items: ['Payroll'],
      active: 'Add Payroll',
    },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    private servicesService : ServicesService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.payrollForm = this.fb.group({
      image: [''],
      number: [''],
      user: ['', [Validators.required]],
      statut: [''],
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      typeuser: [''],
      mode: [, [Validators.required]],
      reasons: ['', [Validators.required]],
      typedepense : ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }
   // methode pour lister les permission

  getStaffss() {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      role_id : 3,
      role_type: ["Staffs", "Direction", "Teacher"],
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.staffs = res.data;
      },
    });
  }


  get f() {
    return this.payrollForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/payrolls/all-payrolls"]
    );
  }

  // consommation de api de creation d'un privilige
  addPayroll() {
    // stockage des données du formulaire dans un objet
    // de type payroll qui sera envoyé a api
    const payrollData = {
      image: this.f['image'].value,
      amount: this.f['amount'].value,
      idUser: this.f['user'].value,
      statut: 'paid',
      typeUser: 'user',
      number: this.f['number'].value,
      mode: this.f['mode'].value,
      payment_deadline: null,
      idTypeInvoice: 1,
      date: formatDate(this.f['date'].value,'dd-MM-YYYY', 'en-US'),
      reasons: this.f['reasons'].value,
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    };
    this.loading = true;
    let payrollDatas = { invoices: [payrollData] };
    // api de creation d'un payroll 
    this.servicesService.addObjets(
      this.servicesService.route.invoices[0], payrollDatas
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
