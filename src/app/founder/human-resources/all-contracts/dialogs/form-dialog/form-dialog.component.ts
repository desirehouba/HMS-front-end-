import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ContractsService } from '../../contracts.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Contracts } from 'src/app/core/models/contracts.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  contracts: Contracts;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class ContractsFormDialogComponent {
  dialogTitle: string;
  contractForm: UntypedFormGroup;
  contracts: Contracts;
  users: any[] = [];
  loading = false;
  user =  false;
  staff = false
  staffs: any[] = [];
  payload!:any
  constructor(
    public dialogRef: MatDialogRef<ContractsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public contractsService: ContractsService,
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private servicesService : ServicesService
  ) {
    this.dialogTitle = data.contracts.description;
    this.contracts = data.contracts;
    this.contractForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.contracts.id],
      description: [this.contracts.description],
      startDate: [this.contracts.start_date],
      type: [this.contracts.type],
      duration: [this.contracts.duration],
      user: [this.contracts.user.id],
      workingHours: [this.contracts.workingHours],
      position: [this.contracts.position],
      grossSalary: [this.contracts.gross_salary],
      status: [this.contracts.status],
      serviceBenefits: [this.contracts.service_benefits],
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
    return this.contractForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateContracts() {
    // stockage des données du formulaire dans un objet
    // de type contract qui sera envoyé a api
    this.loading = true;
    if (this.authService.currentUserValue.id === this.contracts.user.id && this.contracts.status === 'pending_approval') {
      this.payload =  {
        duration: this.f['duration'].value,
        startDate: formatDate(this.f['startDate'].value, 'dd-MM-YYYY', 'en-US'),
        workingHours: this.f['workingHours'].value,
        description: this.f['description'].value,
        position: this.f['position'].value,
        serviceBenefits: this.f['serviceBenefits'].value,
        grossSalary: this.f['grossSalary'].value,
        idUser: this.f['user'].value,
        type: this.f['type'].value,
        status : this.f['status'].value,
      };
    } else  {
      this.payload =  {
        status: this.f['status'].value,
      };
    }
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.contracts[0],
      this.contracts.id,  this.payload
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
