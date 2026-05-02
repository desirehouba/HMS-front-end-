import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl,
  UntypedFormGroup,Validators, } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { Students } from 'src/app/core/models/students.model';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-add-sms',
  templateUrl: './add-sms.component.html',
  styleUrls: ['./add-sms.component.scss'],
})
export class AddSmsComponent {
  smsForm: UntypedFormGroup;
  users: any[] = [];
  loading = false;
  user =  false;
  scholar_level: any;
  breadscrums = [
    {
      title: 'Add Sms',
      items: ['Sms'],
      active: 'Add Sms',
    },
  ];
  students: Students[] = [];
  filterStudents: Students[] = [];

  studentsControl = new UntypedFormControl();
  optionStudent: any;
  filteredStudents!: Students[];

  selectionChangeStudents(options: MatListOption[]) {
    const optionStudent = options[0];
    let value = this.studentsControl.value || [];
    if (optionStudent.selected) value.push(optionStudent.value);
    else value = value.filter((x: any) => x != optionStudent.value);
    this.studentsControl.setValue(value);
  }

  onInputChangeStudents(event: any) {
    let i: number
    const searchInput = event.target.value.toLowerCase();
    this.filteredStudents = this.students.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }


  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    public translateService : TranslateService,
    private servicesService : ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    this.smsForm = this.fb.group({
      message: ['', [Validators.required]],
      users: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUserss();
    this.scholar_level = this.authService.currentUserValue.scholar_level;
  }

  getUserss() {
    this.user = true; 
    const paylaod = {
      idSchool: this.authService.currentUserValue.idSchool,
      idSection: this.authService.currentUserValue.idSection,
      role_id: 8,
      /* idLevel: this.f['user'].value,
      idClasse : this.f['user'].value, */
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.user = false; 
        this.students = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.filteredStudents = this.students.sort(SortArray);
      },
    });
  }

  get f() {
    return this.smsForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/organisations/all-sms"]
    );
  }

  // consommation de api de creation d'un privilige
  addSms() {
    // stockage des données du formulaire dans un objet
    // de type sms qui sera envoyé a api
    this.loading = true;
    const smsData = {
      message: this.f['message'].value,
      idUsers: this.f['users'].value,
      //idUsers: [2,15],
    };

    console.log(smsData);
    
    this.loading = true;
    this.servicesService.addObjets(
      this.servicesService.route.sms[0],
      smsData
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
