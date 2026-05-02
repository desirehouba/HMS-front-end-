import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,Validators,
  UntypedFormGroup,UntypedFormBuilder,
} from '@angular/forms';
import { SalaryAdvances } from 'src/app/core/models/salaryAdvances.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { SalaryAdvancesService } from '../../salaryAdvances.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  salaryAdvances: SalaryAdvances;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormSalaryAdvanceDialogComponent {
  dialogTitle: string;
  noteFraisForm: UntypedFormGroup;
  salaryAdvances: SalaryAdvances;
  istypeinvoice = true;
  loading = false;
  staff = false
  payload!:any
  staffs: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormSalaryAdvanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public invoicesService: SalaryAdvancesService,
    private fb: UntypedFormBuilder,
    private servicesService : ServicesService,
    public authService : AuthService,
  ) {
    // Set the defaults
    this.dialogTitle = data.salaryAdvances.user.name;
    this.salaryAdvances = data.salaryAdvances;
    this.noteFraisForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.salaryAdvances.id],
      user: [this.salaryAdvances.user.id],
      amount: [this.salaryAdvances.amount],
      reason: [this.salaryAdvances.reason],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getStaffss();
  }

  getStaffss() {
    this.staff = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      role_id : 3,
      role_type: ["Staffs", "Direction"],
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.staff = false
        this.staffs = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.staffs = this.staffs.sort(SortArray);
      },
    });
  }
   // methode pour lister les permissions

  get f() {
    return this.noteFraisForm.controls;
  }

  // consommation de api de update de user 

  SalaryAdvancesActions() {
    this.loading = true;
    this.payload =  {
      amount: this.f['amount'].value,
      reason: this.f['reason'].value,/* 
      idUserApprove: this.f['idUserApprove'].value, */
      idUser: this.f['user'].value,
    };
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.salary_advances[0],
      this.salaryAdvances.id, this.payload
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
}
