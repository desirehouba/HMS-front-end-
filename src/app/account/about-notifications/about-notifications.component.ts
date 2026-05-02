import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-about-notifications',
  templateUrl: './about-notifications.component.html',
  styleUrls: ['./about-notifications.component.scss'],
})
export class AboutNotificationsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  hide = false;
  notifications: any[] = [];
  VFormGroup1: UntypedFormGroup;
  loading = false;
  isLinear = false;
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
    
    this.VFormGroup1 = this.fb.group({});
  }

  ngOnInit() {
    this.notif();
  }
  get f() {
    return this.VFormGroup1.controls;
  }

  notif() {
    this.loading = true;
    const payload = {};
    this.servicesService.addObjets(
      this.servicesService.route.notifications[0], payload
    ).subscribe({
      next: (data) => {
        this.notifications = data.data;
        console.log(this.notifications);
        
      },
      error: (error) => { },
    });
  }
}
