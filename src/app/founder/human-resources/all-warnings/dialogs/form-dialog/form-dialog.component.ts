import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { WarningsService } from '../../warnings.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Warnings } from 'src/app/core/models/warnings.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { Teachers } from 'src/app/core/models/teachers.model';
import { Staffs } from 'src/app/core/models/staffs.model';
import { AuthService } from 'src/app/core/service/auth.service';

export interface DialogData {
  id: number;
  action: string;
  warnings: Warnings;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogWarningComponent {
  dialogTitle: string;
  warningForm: UntypedFormGroup;
  warnings: Warnings;
  loading = false;
  teacher = false
  staff = false
  teachers: Teachers[] = [];
  staffs: Staffs[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormDialogWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public warningsService: WarningsService,
    private fb: UntypedFormBuilder,
    private servicesService: ServicesService,
    private authService : AuthService,
  ) {
    this.dialogTitle = data.warnings.user.name;
    this.warnings = data.warnings;
    this.warningForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.warnings.id],
      user: [this.warnings.user.id],
      reason: [this.warnings.reason],
      date: [this.warnings.date],
      typeuser : ['']
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
  }

  ngOnInit(): void {
    this.getStaffss();
  }

  getStaffss() {
    this.staff = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      role_id : 3,
      role_type: ["Staffs", "Direction", "Teacher"],
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

  // methode pour lister les permission

  get f() {
    return this.warningForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateWarnings() {
    // stockage des données du formulaire dans un objet
    // de type warning qui sera envoyé a api
    this.loading = true;
    const warningData = {
      date: formatDate(this.f['date'].value, 'YYYY-MM-dd', 'en-US'),
      reason: this.f['reason'].value,
      idUser: this.f['user'].value,
    };
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.warnings[0],
      this.warnings.id, warningData
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
