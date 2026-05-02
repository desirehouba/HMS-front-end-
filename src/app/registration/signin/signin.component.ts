import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/service/language.service';
import { ServicesService } from 'src/app/core/service/services.service';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  keyForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  loadings = false;
  error = '';
  log = '';
  hide = true;
  cle = false;
  root! : string;
  langs = [
    {
      code : 'en',
      name : 'app.en'
    },
    {
      code : 'fr',
      name : 'app.fr'
    }, 
    {
      code : 'de',
      name : 'app.es'
    }, 
    {
      code : 'ar',
      name : 'app.ar'
    }  
  ]
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    public translateService : TranslateService,
    public languageService: LanguageService,
    public servicesServive : ServicesService
  ) {
    translateService.setDefaultLang('fr');
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.keyForm = this.formBuilder.group({
      key: ['', Validators.required],
      lang: ['', Validators.required]
    });
  }
  get f() {
    return this.authForm.controls;
  }

  get key() {
    return this.keyForm.controls;
  }
  
  setLangage() {
    this.translateService.setDefaultLang(this.key['lang'].value);
    localStorage.setItem('lang', this.key['lang'].value);
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'app.Username_and_Password_not_valid'; 
      return;
    } else {
      this.subs.sink = this.authService
        .logins(this.f['email'].value, this.f['password'].value)
        .subscribe({
          next: (res) => { 
            if (res) {
              setTimeout(() => {
                const role = this.authService.currentUserValue.role;
                const role_type = this.authService.currentUserValue.role_type;
                console.log(this.authService.currentUserValue);
                
                if ( role === Role.Admin) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role === Role.Founder || role === Role.Rector || role === Role.Principale || role === Role.Assistant ) {
                  this.router.navigate(['/splashScreen/hotels']);
                } else if ( role_type === "Staffs" ) {
                  this.router.navigate(['/staff/dashboard/main']);
                } else if (role === Role.Teacher) {
                  this.router.navigate(['/teacher/dashboard/main']);
                  this.authService.currentUserValue.idClasse = this.authService.currentUserValue.classes[0].id;
                  localStorage.setItem('currentUser', JSON.stringify(this.authService.currentUserValue));
                } else if (role === Role.Student || role === Role.Inscription) {
                  this.router.navigate(['/student/dashboard/main']);
                } else if (role === Role.Parent) {
                  this.router.navigate(['/splashScreen/students']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
              }, 500);
            } 
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
            this.servicesServive.showNotification(
              'snackbar-danger', error, 'bottom', 'center'
            );
          },
        });
    }
  }

  validateKey() {
    this.loadings = true;
    let payload = {
      cle : this.key['key'].value
    }
    this.servicesServive.findlicence(payload).subscribe({
      next: (res) => {
        console.log(res)
        this.loadings = false;
        this.cle = true;
        environment.apiUrl = 'https://' + res.data.route+'.ms-hotel.net/api';
        environment.imageDirectoryPatchs =  'https://' + res.data.route+'.ms-hotel.net/profil/';
        localStorage.setItem('rtr', res.data.route);
        localStorage.setItem('logo', res.data.logo);
        this.log= environment.imageDirectoryPatchs+res.data.logo;
        
      },  
      error: (error) => {
        this.submitted = false;
        this.loadings = false;
        this.servicesServive.showNotification(
          'snackbar-danger',
          'Invalid Key', 'bottom',
          'center'
        );
      },
    });
  }
}
