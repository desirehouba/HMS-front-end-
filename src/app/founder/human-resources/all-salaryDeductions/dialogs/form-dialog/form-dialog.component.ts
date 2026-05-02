import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,Validators,
  UntypedFormGroup,UntypedFormBuilder,
} from '@angular/forms';
import { SalaryDeductions } from 'src/app/core/models/salaryDeductions.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { SalaryDeductionsService } from '../../salaryDeductions.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  salaryDeductions: SalaryDeductions;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormSalaryDeductionDialogComponent {
  dialogTitle: string;
  noteFraisForm: UntypedFormGroup;
  salaryDeductions: SalaryDeductions;
  istypeinvoice = true;
  loading = false;
  staff = false
  payload!:any
  staffs: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormSalaryDeductionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public invoicesService: SalaryDeductionsService,
    private fb: UntypedFormBuilder,
    private servicesService : ServicesService,
    public authService : AuthService,
  ) {
    // Set the defaults
    this.dialogTitle = data.salaryDeductions.user.name;
    this.salaryDeductions = data.salaryDeductions;
    this.noteFraisForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.salaryDeductions.id],
      user: [this.salaryDeductions.user.id],
      date: [this.salaryDeductions.date],
      amount: [this.salaryDeductions.amount],
      reason: [this.salaryDeductions.reason],
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

  SalaryDeductionsActions() {
    this.loading = true;
    this.payload =  {
      amount: this.f['amount'].value,
      date: formatDate(this.f['date'].value,'YYYY-MM-dd', 'en-US'),
      reason: this.f['reason'].value,
      idUser: this.f['user'].value,
    };
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.salaries_deductions[0],
      this.salaryDeductions.id, this.payload
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
