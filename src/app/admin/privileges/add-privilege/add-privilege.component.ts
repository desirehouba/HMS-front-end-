import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PrivilegesService } from '../all-privileges/privileges.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-privilege',
  templateUrl: './add-privilege.component.html',
  styleUrls: ['./add-privilege.component.scss'],
})
export class AddPrivilegeComponent {
  privilegeForm: UntypedFormGroup;
  Ressources = [
    'Privileges','Roles','Forfaits','Logements', 
    'Bailleurs','payment Types','housing Categories',
    'Cities'
  ];
  loading = false;

  breadscrums = [
    {
      title: 'Add Privilege',
      items: ['Privilege'],
      active: 'Add Privilege',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private privilegesService :PrivilegesService,
    private router : Router,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.privilegeForm = this.fb.group({
      name: ['', [Validators.required]],
      ressource: [''],
      description: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.privilegeForm.value);
  }
  get f() {
    return this.privilegeForm.controls;
  }

  cancel() {
    this.router.navigate(["/admin/privileges/all-privileges"]);
  }

  // consommation de api de creation d'un privilige
  addPrivilege() {
    // stockage des données du formulaire dans un objet
    // de type Privilege qui sera envoyé a api

    this.loading = true;
    const privilegeData = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      guard_name : 'web',
      ressource: this.f['ressource'].value,
    };

    // envoie des données du formulaire à api
    this.privilegesService.addPrivileges(privilegeData);
  }
}
