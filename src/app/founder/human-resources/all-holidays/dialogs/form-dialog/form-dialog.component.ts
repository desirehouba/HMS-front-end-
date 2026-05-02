import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HolidaysService } from '../../holidays.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Holidays } from 'src/app/core/models/holidays.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  holidays: Holidays;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class HolidaysFormDialogComponent {
  dialogTitle: string;
  holidayForm: UntypedFormGroup;
  holidays: Holidays;
  loading = false;
  user =  false;
  staff = false
  staffs: any[] = [];
  payload!:any
  constructor(
    public dialogRef: MatDialogRef<HolidaysFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public holidaysService: HolidaysService,
    private fb: UntypedFormBuilder,
    public authService : AuthService,
    private servicesService : ServicesService
  ) {
    this.dialogTitle = data.holidays.user.name;
    this.holidays = data.holidays;
    this.holidayForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.holidays.id],
      idUserApprove: [this.holidays.userApprove.id],
      reason: [this.holidays.reason],
      type: [this.holidays.type],
      days_taken: [this.holidays.days_taken],
      start_date: [this.holidays.start_date],
      end_date: [this.holidays.end_date],
    });
  }
  submit() {
    // emppty stuff
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

  get f() {
    return this.holidayForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateHolidays() {
    // stockage des données du formulaire dans un objet
    // de type holiday qui sera envoyé a api
    this.loading = true;
    if (this.authService.currentUserValue.id === this.holidays.user.id && this.holidays.status ===  'pending_approval') {
      this.payload =  {
        idUserApprove: this.f['idUserApprove'].value,
        reason: this.f['reason'].value,
        type: this.f['type'].value,
        days_taken: this.f['days_taken'].value,
        start_date: formatDate(this.f['start_date'].value, 'YYYY-MM-dd', 'en-US'),
        end_date: formatDate(this.f['end_date'].value,'YYYY-MM-dd', 'en-US'),
      };
    } else if (this.authService.currentUserValue.id === this.holidays.userApprove.id) {
      this.payload =  {
        status: this.f['status'].value,
      };
    }
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.holidays[0],
      this.holidays.id, this.payload
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
