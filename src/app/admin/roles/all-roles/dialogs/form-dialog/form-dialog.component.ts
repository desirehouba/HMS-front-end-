import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RolesService } from '../../roles.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { MatListOption } from '@angular/material/list';  
import { Roles } from 'src/app/core/models/roles.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { Hotels } from 'src/app/core/models/hotels.model';

export interface DialogData {
  id: number;
  action: string;
  roles: Roles;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  dialogTitle: string;
  roleForm: UntypedFormGroup;
  roles: Roles;
  permissions!: any[];
  selectPermission!: any;
  permissionsControl = new UntypedFormControl();
  types = [ '', 'Direction' ,'Staffs', 'Teacher'];
  
  hotels : Hotels[] = [];
  sections: any[] = [];
  loading = false;

  // fontion de recherche dans le mat-list-option
  selectionChangePermissions(options: MatListOption[]) {
    const optionPermission = options[0];
    let value = this.permissionsControl.value || [];
    if (optionPermission.selected) value.push(optionPermission.value);
    else value = value.filter((x: any) => x != optionPermission.value);
    this.permissionsControl.setValue(value);
  }

  filteredPermissions!: any[];

  onInputChange(event: any) {
    const searchInput = event.target.value.toLowerCase();

    this.filteredPermissions = this.permissions.filter(({ description }) => {
      const noms = description.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public servicesService: ServicesService,
    public rolesService : RolesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    
    this.dialogTitle = data.roles.name;
    this.roles = data.roles;
    this.roleForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.roles.id],
      name: [this.roles.name],
      permissions: [this.roles.permission_ids],
      description: [this.roles.description],
      type: [this.roles.type],  
    });

    
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.getPermissions();
    this.getSchoolss();
  }

  getPermissions() {
    this.rolesService.getPermissions().subscribe({
      next: (res) => {
        this.permissions = res.data;
        this.filteredPermissions = this.permissions;
        this.permissionsControl.setValue(this.roles.permission_ids);
      },
    });

  }

  getSchoolss(): void {
    const paylaod = {}

    this.servicesService.getObjetss(
      this.servicesService.route.hotels[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.hotels = res.data;
      },
    });
  }

  getSectionss(): void {
    const paylaod = {
      hotel_id : this.f['hotel'].value,
    }

    this.servicesService.getObjetss(
      this.servicesService.route.sections[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.sections = res.data;
      },
    });
  }

  get f() {
    return this.roleForm.controls;
  }

  // methode de consomation de l'api de mise
  // methode pour metre a jour un role
  updateRole() {
    this.loading = true;
    const payload = {
      //name: this.f['name'].value,
      description: this.f['description'].value,
      permissions: this.permissionsControl.value,
      type: this.f['type'].value,/* 
      idSection: this.f['section'].value, *//* 
      hotel_id: this.f['hotel'].value, */
    };
    this.servicesService.updateObjets(
      this.servicesService.route.roles[0],
      this.roles.id, payload
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
