import { Component } from '@angular/core';
import {UntypedFormBuilder,
  UntypedFormGroup,Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss'],
})
export class AddContractComponent {
  contractForm: UntypedFormGroup;
  users: any[] = [];
  loading = false;
  user =  false;
  staff = false
  staffs: any[] = [];
  breadscrums = [
    {
      title: 'Add Contract',
      items: ['Contract'],
      active: 'Add Contract',
    },
  ];
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
    this.contractForm = this.fb.group({
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      type: ['', [Validators.required]],
      duration: [''],
      user: ['', [Validators.required]],
      workingHours: ['', [Validators.required]],
      position: ['', [Validators.required]],
      grossSalary: ['', [Validators.required]],
      status: ['', [Validators.required]],
      serviceBenefits: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getStaffss();
  }

  get f() {
    return this.contractForm.controls;
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
    this.router.navigate(
      ["/founder/human-resources/all-contracts"]
    );
  }

  // consommation de api de creation d'un privilige
  addContract() {
    // stockage des données du formulaire dans un objet
    // de type contract qui sera envoyé a api
    
    const contractData = {
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
    this.loading = true;
    let contractDatas = { contracts: [contractData] };
    this.servicesService.addObjets(
      this.servicesService.route.contracts[0],
      contractData
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
