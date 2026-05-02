import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl,
  UntypedFormGroup, Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-salaryAdvance',
  templateUrl: './add-salaryAdvance.component.html',
  styleUrls: ['./add-salaryAdvance.component.scss'],
})
export class AddSalaryAdvanceComponent {
  salaryAdvanceForm: UntypedFormGroup;
  loading = false;
  staff = false
  staffs: any[] = [];
  breadscrums = [
    {
      title: 'Add Note Frais',
      items: ['note Frais'],
      active: 'Add note Frais',
    },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    private servicesService : ServicesService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.salaryAdvanceForm = this.fb.group({
      amount: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      user: ['', [Validators.required]],
      idUserApprove: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getStaffss();
    this.getUserApprouves();
  }
   // methode pour lister les permissions

  get f() {
    return this.salaryAdvanceForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/human-resources/all-salaryAdvances"]
    );
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

  getUserApprouves() {
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


  // consommation de api de creation d'un privilige
  addSalaryAdvances() {
    // stockage des données du formulaire dans un objet
    // de type noteFrai qui sera envoyé a api
    const salaryAdvancesData = {
      amount: this.f['amount'].value,
      reason: this.f['reason'].value,
      idUserApprove: this.f['idUserApprove'].value,
      idUser: this.f['user'].value,
    };
    this.loading = true;
    let salary_advances = { salary_advances: [salaryAdvancesData] };
    // api de creation d'un noteFrai 
    this.servicesService.addObjets(
      this.servicesService.route.salary_advances[0], salary_advances
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
