import { Component, OnInit } from '@angular/core';
import { Router,  } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { SplashScreenService } from '../splashScreens.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  submitted = false;
  loading = false;
  error = '';
  hide = false;
  students! : any[];
  image! : any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private splashScreenService :SplashScreenService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    super();
    this.image = environment.imageDirectoryPatchs
  }

  ngOnInit() {
    this.getAllStudentss();
  }

  getAllStudentss() {
    const paylaod = {
      role_id : 8,
      idParent : this.authService.currentUserValue.id
    }
    this.subs.sink = this.splashScreenService
      .getStudentss(paylaod)
      .subscribe({
        next: (data) => {
          this.students = data.data;
          this.hide = true;
        },
      }
    );
  }

  onSubmit(payload: number) {
    localStorage.removeItem('idOptionLevel');
    localStorage.removeItem('idAssessementsType');
    this.authService.currentUserValue.idStudent = payload;
    localStorage.setItem('currentUser',
      JSON.stringify(this.authService.currentUserValue));
    this.router.navigate(["/student/dashboard/main"]);
  }
}
