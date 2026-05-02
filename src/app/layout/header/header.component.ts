import { ConfigService } from '../../config/config.service';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { RightSidebarService } from 'src/app/core/service/rightsidebar.service';
import { Role } from 'src/app/core/models/role';
import { LanguageService } from 'src/app/core/service/language.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { InConfiguration } from 'src/app/core/models/config.interface';
import { ServicesService } from 'src/app/core/service/services.service';
import { environment } from 'src/environments/environment';

import { Students } from 'src/app/core/models/students.model';

interface Notifications {
  message: string;
  time: string;
  icon: string;
  color: string;
  status: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  public config!: InConfiguration;
  userImg?: string;
  homePage?: string;
  isNavbarCollapsed = true;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  isOpenSidebar?: boolean;
  docElement: HTMLElement | undefined;
  isFullScreen = false;
  sections: any[] = [];
  classesTeacher  : any[] = [];
  classrooms :  any[] = [];
  classroom : string = '';
  userName : string = '';
  students : Students[]= [];
  sectionTrue: any = 0;
  icons!: String
  status!: String
  scholar_level!: String;
  nameStudent!: string;
  vide = { id: null, name: 'All/Tous' };
  permissions!: any[]
  sms!: any
  route!:any
  
  
  account: string = 'account/about-account';
  notification : string = 'account/about-notifications'
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    private servicesService : ServicesService
  ) {
    super();
    this.sectionTrue = this.authService.currentUserValue.idSection
    /* this.classesTeacher =  this.authService.currentUserValue.classes; */ 
    
    /* for (let classe of  this.authService.currentUserValue.classes){
      if (classe.id === this.authService.currentUserValue.idClasse){
        this.classroom = classe.name;
      }
    } */
    if (this.authService.currentUserValue.role === Role.Parent) {
      this.nameStudent = this.authService.currentUserValue.idStudent.name
    }
    
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Francais', flag: 'assets/images/flags/francais.jpg', lang: 'fr' },
    { text: 'Espagnol', flag: 'assets/images/flags/espagne.png', lang: 'de' },
    { text: 'Arabe', flag: 'assets/images/flags/arabe.png', lang: 'ar' },
  ];
  notifications: any[] = [];
  ngOnInit() {
    this.icons = 'person_add';
    this.status='msg-unread', 
    //this.notif();
    this.config = this.configService.configData;
    this.scholar_level = this.authService.currentUserValue.scholar_level;

    const userRole = this.authService.currentUserValue.role;
    const role_type = this.authService.currentUserValue.role_type
    //this.userName = this.authService.currentUserValue.username;
    this.permissions = this.authService.currentUserValue.permissions
    if (this.authService.currentUserValue.photo === null ){
      this.userImg = 'assets/images/user/admin.jpg'
    }else{
      this.userImg = environment.imageDirectoryPatchs+this.authService.currentUserValue.photo;
    }
    
    if (userRole === Role.Admin) {
      this.homePage = 'admin/dashboard/main';
    } else if (userRole === Role.Founder || userRole === Role.Rector) {
      this.homePage = 'splashScreen/hotels';
      this.route = '/founder/'
    } else if (userRole === Role.Principale || userRole === Role.Assistant) {
      this.homePage = 'splashScreen/hotels';
      this.route = '/founder/'
    } else if (userRole === Role.Staff || userRole === Role.Censor || userRole === Role.Secretary || userRole === Role.StudyPrefect || userRole === Role.SG) {
      this.homePage = 'staff/dashboard/main';
      this.route = '/staff/'
    } else if (userRole === Role.Teacher) {
      this.homePage = 'teacher/dashboard/main';
    } else if (userRole === Role.Student) {
      this.homePage = 'student/dashboard/main';
    } else if (userRole === Role.Inscription) {
      this.homePage = 'student/dashboard/main';
    } else if (userRole === Role.Parent) {
      this.homePage = '/splashScreen/students';
      this.getAllStudentss();
    } else { 
      this.homePage = 'admin/dashboard/main';
    }
    /* if (this.permissions.indexOf('sec-2') != -1) {
      this.getAllSectionss();
    } */
    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.svg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }

    //this.getSMS()
  }

  getAllSectionss() {
    const paylaod = {
      idSchool : this.authService.currentUserValue.idSchool
    }
    this.servicesService.getAllSectionss(paylaod)
      .subscribe({
        next: (res) => {
          this.sections = res.data;
          if (res.data.length>1 && this.permissions.indexOf('sec-3') != -1) {
            this.sections.push(this.vide)
          }
        },
      }
    );
  }

  sendSms() {
    let route = this.route+"organisations/all-sms"
    this.router.navigate(
      [route]
    );
    console.log(route);
    
  }

  getSMS() {
    this.servicesService.getSms(
      this.servicesService.route.sms[2],
    ).subscribe({
      next: (res) => {
        console.log(res.data.credit);
        this.sms = res.data.credit
      },
    });
  }

  setSection(section : any) {
    this.authService.currentUserValue.idSection = section.id;
    this.authService.currentUserValue.idClasse = null
    localStorage.setItem(
      'currentUser',
      JSON.stringify(this.authService.currentUserValue)
    );
    localStorage.setItem('section', section.name);
    localStorage.setItem('idclasseRating', '');
    localStorage.setItem('idclasseAssessment', '');
    localStorage.setItem('idclasseRating', '');
    location.reload();
  }

  setClassroom(Classroom : any) {
    this.authService.currentUserValue.idClasse = Classroom.id;
    this.authService.currentUserValue.idSection = Classroom.idSection
    localStorage.setItem(
      'currentUser',
      JSON.stringify(this.authService.currentUserValue)
    );
    for (let classe of  this.authService.currentUserValue.classes){
      if (classe.id === Classroom.id){
        this.classroom = classe.name;
      }
    }
    location.reload();
  }
  setStudent(student: Students) {
  this.nameStudent = student.name
    this.authService.currentUserValue.idStudent = student;
    localStorage.setItem(
      'currentUser',
      JSON.stringify(this.authService.currentUserValue)
    );
    location.reload();
  }

  getAllStudentss() {
    const paylaod = {
      role_id : 8,
      idParent : this.authService.currentUserValue.id
    }
    
   this.servicesService
    .getStudentss(paylaod)
    .subscribe({
      next: (data) => {
        this.students = data.data;
        console.log(this.students);
      },
      }
    );
  }

  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('theme') as string
      );
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menuOption') as string
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'menu_' + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_logoheader') as string
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'logo-' + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem('sidebar_status')) {
      if (localStorage.getItem('sidebar_status') === 'close') {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      } else {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      }
    }
  }
  callFullscreen() {
    if (!this.isFullScreen) {
      this.docElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
    location.reload();
  }
  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.authService.logout();
  }

  notif() {
    const payload = {};
    this.servicesService.addObjets(
      this.servicesService.route.notifications[0], payload
    ).subscribe({
      next: (data) => {
        this.notifications = data.data;
        console.log(data.data);
        
      },error: (error) => {},
    });
  }
}
