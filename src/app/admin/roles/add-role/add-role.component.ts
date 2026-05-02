import { Component, OnInit} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  
} from '@angular/forms';
import { RolesService } from '../all-roles/roles.service';
import { MatListOption } from '@angular/material/list';
import { Router } from '@angular/router';
import { Privileges } from 'src/app/core/models/privileges.model';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent {
  roleForm: UntypedFormGroup;
  permissionsControl = new UntypedFormControl();
  permissions!: Privileges[];
  optionPermission: any;
  filteredPermissions!: Privileges[];
  types = [ '', 'Direction' ,'Staffs'];
  schools : any[] = [];
  sections : any[] = [];

  loading = false;

  selectionChangePermissions(options: MatListOption[]) {
    const optionPermission = options[0];
    let value = this.permissionsControl.value || [];
    if (optionPermission.selected) value.push(optionPermission.value);
    else value = value.filter((x: any) => x != optionPermission.value);
    this.permissionsControl.setValue(value);
  }

  onInputChange(event: any) {
    const searchInput = event.target.value.toLowerCase();
    this.filteredPermissions = this.permissions.filter(({ description }) => {
      const noms = description.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  breadscrums = [
    {
      title: 'Add Role',
      items: ['Role'],
      active: 'Add Role',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private rolesService : RolesService,
    private router: Router,
    public translateService : TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(localStorage.getItem('lang') as string);
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      permissions: ['', [Validators.required]],
      type: [''],
      school: [''],
      section: [''],
    });
  }
  onSubmit() {
    // console.log('Form Value', this.roleForm.value);
  }
  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions() {
    const paylaod = {
      filter_value: '',
      page_items: 1,
      nbre_items: 1
    }
    this.servicesService.getObjetss(
      this.servicesService.route.permissions[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.permissions = res.data;
        this.filteredPermissions = this.permissions;
      },
    });
  }



  

  get f() {
    return this.roleForm.controls;
  }

  cancel() {
    this.router.navigate(["/admin/roles/all-roles"]);
  }


  // consommation de api de creation d'un privilige
  addRole() {
    // stockage des données du formulaire dans un objet
    // de type Role qui sera envoyé a api
    
    const rolesData = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      guard_name: "web",
      permissions: this.f['permissions'].value,
      type: this.f['type'].value,
    };
    console.log(rolesData);
    this.loading = true;
    // envoie des données du formulaire à api
    this.rolesService.addRoles(rolesData);
  }
}
