import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PermissionsService } from '../../permissions.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Permissions } from 'src/app/core/models/permissions.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  permissions: Permissions;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class PermissionsFormDialogComponent {
  dialogTitle: string;
  permissionForm: UntypedFormGroup;
  permissions: Permissions;
  users: any[] = [];
  loading = false;
  payload!:any
  constructor(
    public dialogRef: MatDialogRef<PermissionsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public permissionsService: PermissionsService,
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private servicesService : ServicesService
  ) {
    this.dialogTitle = data.permissions.name;
    this.permissions = data.permissions;
    this.permissionForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.permissions.id],
      name: [this.permissions.name],
      estimation: [this.permissions.estimation],
      idProject: [this.permissions.User.id],
      duree_mise: [this.permissions.duration],
      observation: [this.permissions.observation],
      raison: [this.permissions.observation],
      duration: [this.permissions.observation],
      dateDepart: [this.permissions.observation],
      dateRetour: [this.permissions.observation],
      statut: 'a_approve',
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.permissionForm.controls;
  }

  // consommation de api de creation d'un privilige
  updatePermissions() {
    // stockage des données du formulaire dans un objet
    // de type permission qui sera envoyé a api
    this.loading = true;
    if (this.authService.currentUserValue.id === this.permissions.user.id && this.permissions.status ===  'pending_approval') {
      this.payload =  {
        amount: this.f['amount'].value,
        date: formatDate(this.f['date'].value,'dd-MM-YYYY', 'en-US'),
        libelle: this.f['libelle'].value,
        description: this.f['description'].value,
        idUserApprove: this.f['idUserApprove'].value,
      };
    } else if (this.authService.currentUserValue.id === this.permissions.userApprove.id) {
      this.payload =  {
        status: this.f['status'].value,
      };
    }
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.permissions[0],
      this.permissions.id,  this.payload
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
