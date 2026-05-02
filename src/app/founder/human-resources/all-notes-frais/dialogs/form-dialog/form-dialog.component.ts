import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,Validators,
  UntypedFormGroup,UntypedFormBuilder,
} from '@angular/forms';
import { NoteFrais } from 'src/app/core/models/noteFrais.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { NotesFraisService } from '../../notesFrais.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  notesFrais: NoteFrais;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  dialogTitle: string;
  noteFraisForm: UntypedFormGroup;
  notesFrais: NoteFrais;
  istypeinvoice = true;
  loading = false;
  staff = false
  payload!:any
  staffs: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public invoicesService: NotesFraisService,
    private fb: UntypedFormBuilder,
    private servicesService : ServicesService,
    public authService : AuthService,
  ) {
    // Set the defaults
    this.dialogTitle = data.notesFrais.libelle;
    this.notesFrais = data.notesFrais;
    this.noteFraisForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.notesFrais.id],
      user: [this.notesFrais.user.id],
      status: [this.notesFrais.status],
      date: [this.notesFrais.date],
      amount: [this.notesFrais.amount],
      libelle: [this.notesFrais.libelle],
      idUserApprove: [this.notesFrais.userApprove.id],
      description: [this.notesFrais.description],
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

  NoteFraisActions() {
    this.loading = true;
    if (this.authService.currentUserValue.id === this.notesFrais.user.id && this.notesFrais.status ===  'pending_approval') {
      this.payload =  {
        amount: this.f['amount'].value,
        date: formatDate(this.f['date'].value,'dd-MM-YYYY', 'en-US'),
        libelle: this.f['libelle'].value,
        description: this.f['description'].value,
        idUserApprove: this.f['idUserApprove'].value,
      };
    } else if (this.authService.currentUserValue.id === this.notesFrais.userApprove.id) {
      this.payload =  {
        status: this.f['status'].value,
      };
    }
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.notefrais[0],
      this.notesFrais.id, this.payload
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
