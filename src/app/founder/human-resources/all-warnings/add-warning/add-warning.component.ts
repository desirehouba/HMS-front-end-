import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { Router } from '@angular/router';
import { Teachers } from 'src/app/core/models/teachers.model';
import { Staffs } from 'src/app/core/models/staffs.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-warning',
  templateUrl: './add-warning.component.html',
  styleUrls: ['./add-warning.component.scss'],
})
export class AddWarningComponent {
  warningForm: UntypedFormGroup;
  loading = false;
  teacher = false
  staff = false
  teachers: Teachers[] = [];
  staffs: Staffs[] = [];
  breadscrums = [
    {
      title: 'Add Warning',
      items: ['Warning'],
      active: 'Add Warning',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private servicesService: ServicesService,
    private authService : AuthService,
    private router : Router,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.warningForm = this.fb.group({
      reason: ['', [Validators.required]],
      date: ['', [Validators.required]],
      user: ['', [Validators.required]],
      typeuser : ['']
    });
  }
  onSubmit() {
    console.log('Form Value', this.warningForm.value);
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

  cancel() {
    this.router.navigate([
      "/founder/human-resources/all-warnings"]);
  }

  get f() {
    return this.warningForm.controls;
  }

  // consommation de api de creation d'un privilige
  addWarning() {
    // stockage des données du formulaire dans un objet
    // de type warning qui sera envoyé a api
    this.loading = true;
    const warningData = {
      date: formatDate(this.f['date'].value, 'YYYY-MM-dd', 'en-US'),
      reason: this.f['reason'].value,
      idUser: this.f['user'].value,
    };
    let warnings = { warnings: [warningData] };
    this.servicesService.addObjets(
      this.servicesService.route.warnings[0],
      warnings
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
