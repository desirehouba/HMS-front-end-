import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PackagesService } from '../all-packages/packages.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss'],
})
export class AddPackageComponent {
  packageForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Package',
      items: ['Package'],
      active: 'Add Package',
    },
  ];
  choices = [ true, false ];
  levels = [
    'Maternelle',
    'Primaire',
    'Secondaire',
    'Université'
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private packagesService : PackagesService) {
    this.packageForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: [''],
      level: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      website: [''],
      mail_pro: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.packageForm.value);
  }

  get f() {
    return this.packageForm.controls;
  }

  // consommation de api de creation d'un privilige
  addPackage() {
    // stockage des données du formulaire dans un objet
    // de type Role qui sera envoyé a api
    
    const packagesData = {
      name: this.f['name'].value,
      price: this.f['price'].value,
      duration: this.f['duration'].value,
      level: this.f['level'].value,
      description: this.f['description'].value,
      website: this.f['website'].value,
      mail_pro: this.f['mail_pro'].value,
    };
    console.log(packagesData);
    
    // envoie des données du formulaire à api
    this.packagesService.addPackages(packagesData);
  }
}
