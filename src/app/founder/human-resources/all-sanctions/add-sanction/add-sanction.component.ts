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

@Component({
  selector: 'app-add-sanction',
  templateUrl: './add-sanction.component.html',
  styleUrls: ['./add-sanction.component.scss'],
})
export class AddSanctionComponent {
  sanctionForm: UntypedFormGroup;
  loading = false;
  teacher = false
  staff = false
  teachers: Teachers[] = [];
  staffs: Staffs[] = [];
  breadscrums = [
    {
      title: 'Add Sanction',
      items: ['Sanction'],
      active: 'Add Sanction',
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
    this.sanctionForm = this.fb.group({
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      reasons: ['', [Validators.required]],
      user: ['', [Validators.required]],
      level: [''],
      typeuser : ['']
    });
  }
  onSubmit() {
    console.log('Form Value', this.sanctionForm.value);
  }

  ngOnInit(): void {
    this.getTeacherss();
    this.getStaffss();
  }

  getTeacherss() {
    this.teacher = true
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool,
      role_id : 5,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.teacher = false
        this.teachers = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.teachers = this.teachers.sort(SortArray);
      },
    });
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
      "/founder/human-resources/all-sanctions"]);
  }

  get f() {
    return this.sanctionForm.controls;
  }

  // consommation de api de creation d'un privilige
  addSanction() {
    // stockage des données du formulaire dans un objet
    // de type sanction qui sera envoyé a api
    this.loading = true;
    const sanctionData = {
      type: this.f['type'].value,
      description: this.f['description'].value,
      reasons: this.f['reasons'].value,
      idUser: this.f['user'].value,
      idSchool : this.authService.currentUserValue.idSchool,
      idSection : this.authService.currentUserValue.idSection,
    };
    // envoie des données du formulaire à api
    this.servicesService.addObjets(
      this.servicesService.route.sanctions[0],
      sanctionData
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
