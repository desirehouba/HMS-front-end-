import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ServicesService } from 'src/app/core/service/services.service';
import { Students } from 'src/app/core/models/students.model';
import { Parents } from 'src/app/core/models/parents.model';
import { UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-about-account',
  templateUrl: './about-account.component.html',
  styleUrls: ['./about-account.component.scss'],
})
export class AboutAccountComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  hide = false;
  
  UserForm: UntypedFormGroup;
  user!: Students;
  parents!: Parents;
  image: any;
  loading = false;
  constructor(
    private authService: AuthService,
    public translateService: TranslateService,
    public servicesService : ServicesService,
    private fb: UntypedFormBuilder,
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string
    );
    super();
    this.image = environment.imageDirectoryPatchs
    this.UserForm = this.fb.group({
      current_password: [''],
      new_password: [''],
    });
  }

  ngOnInit() {
    this.findUser();
  }


  findUser() {
    this.servicesService.findUser(this.authService.currentUserValue.id)
    .subscribe({
      next: (res) => {
        this.user = res.data.user;
        console.log(this.user);
        this.hide = true;
      },
    });
  }

  get f() {
    return this.UserForm.controls;
  }

  UserActions() {

    this.loading = true;
    
    const userData = {
      current_password: this.f['current_password'].value,
      new_password: this.f['new_password'].value,
    };

    // envoie des données du formulaire à api

    this.servicesService.addObjets(
      this.servicesService.route.userspassword[0],
      userData,
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.authService.logout();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error.message);
      },
    });
  }
}
