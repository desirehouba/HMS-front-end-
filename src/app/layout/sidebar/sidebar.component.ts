/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, ElementRef,
  OnInit, Renderer2, HostListener,
  OnDestroy, ViewChild, } from '@angular/core';
import { ROUTES } from './sidebar-items';
import { AuthService } from 'src/app/core/service/auth.service';
import { RouteInfo } from './sidebar.metadata';
import { Sections } from 'src/app/core/models/sections.model';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  menuForm: UntypedFormGroup;
  public sidebarItems!: RouteInfo[];
  public sidebarItems1!: RouteInfo[];
  public sidebarItems2: any[]= [];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  listMaxWidth?: string;
  userFullName?: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  currentRoute?: string;
  routerObj;
  sections : Sections[] =[];
  hotelName: any = null;
  scholar_level = ''

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private fb: UntypedFormBuilder,
  ) { 
    this.hotelName = this.authService.currentUserValue.hotelName;
 
    
    this.elementRef.nativeElement.closest('body');
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });

    this.menuForm = this.fb.group({
      name: [null],
    });
  }
  get f() {
    return this.menuForm.controls;
  }
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  @HostListener('window:resize', ['$event'])
  windowResizecall(event: Event) {
  this.setMenuHeight();
  this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }
  ngOnInit() { 
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role; 
      const scholar_level = this.authService.currentUserValue.scholar_level;
      const permissions = this.authService.currentUserValue.permissions;
      const typeRole = this.authService.currentUserValue.role_type;
      this.userType = this.authService.currentUserValue.role_description;
      const registrationPaid = this.authService.currentUserValue.registrationPaid
      
      if (localStorage.getItem('logo')=== 'null' ){
        this.userImg = 'assets/images/user/admin.jpg';
      } else {
        //this.userImg = environment.imageDirectoryPatchs+localStorage.getItem('logo'); 
        this.userImg = 'assets/logo/logo-douala.jpeg';
      }
      
      if (userRole === 'Admin') {
        this.sidebarItems = ROUTES.filter(
          (x) => x.role.indexOf(userRole) !== -1 
        );
        localStorage.setItem('sidebarmenu', JSON.stringify(this.sidebarItems));
      } else if (typeRole === 'Direction' || typeRole === 'Founder') { 
        this.sidebarItems = ROUTES.filter(
          (x) => x.typeRole.indexOf(typeRole) !== -1 /*  &&
            x.permissions.filter(val => permissions.includes(val)).length !== 0  */   
        );
        for (let perms of this.sidebarItems) {
          perms.submenu = perms.submenu.filter(
            (x) => x.typeRole.indexOf(typeRole) !== -1
              
          );
        }
        this.sidebarItems1 = this.sidebarItems
        localStorage.setItem('sidebarmenu', JSON.stringify(this.sidebarItems));
      } else if (typeRole === 'Staffs') {
        this.sidebarItems = ROUTES.filter(
          (x) => x.typeRole.indexOf(typeRole) !== -1 &&
            x.permissions.filter(val => permissions.includes(val)).length !== 0 
            && x.scholar_level.indexOf(scholar_level) !== -1
        );
        for (let perms of this.sidebarItems) {
          perms.submenu = perms.submenu.filter(
            (x) => x.permissions.filter(val => permissions.includes(val)).length !== 0 
            && x.scholar_level.indexOf(scholar_level) !== -1
          );
        }
        this.sidebarItems1 = this.sidebarItems
        localStorage.setItem('sidebarmenu', JSON.stringify(this.sidebarItems));
      } else if (userRole === 'Inscription')  {
        this.sidebarItems = ROUTES.filter(
          (x) => x.role.indexOf(userRole) !== -1 
            && x.scholar_level.indexOf(scholar_level) !== -1
          && x.registrationPaid.indexOf(registrationPaid) !== -1
        );
        this.sidebarItems1 = this.sidebarItems
        localStorage.setItem('sidebarmenu', JSON.stringify(this.sidebarItems));
      } else {
        this.sidebarItems = ROUTES.filter(
          (x) => x.role.indexOf(userRole) !== -1 
          && x.scholar_level.indexOf(scholar_level) !== -1
        );
        this.sidebarItems1 = this.sidebarItems
        localStorage.setItem('sidebarmenu', JSON.stringify(this.sidebarItems));
      }
    }
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  loadData() {
    if (this.f['name'].value != null && this.f['name'].value != '') {
      this.sidebarItems = JSON.parse(localStorage.getItem('sidebarmenu') || '{}');
      let FilterMenu = []
      for (let item of this.sidebarItems) {
        item.submenu = item.submenu.filter(
          (x) => x.badge.indexOf(this.f['name'].value.toLowerCase()) !== -1 
        );
        if (item.submenu.length != 0) { FilterMenu.push(item) }
      }
      this.sidebarItems = FilterMenu
    } else {
      this.sidebarItems = JSON.parse(localStorage.getItem('sidebarmenu') || '{}');
    }
    
  }

  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(
        this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(
        this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(
        this.document.body, 'side-closed-hover');
      this.renderer.removeClass(
        this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(
        this.document.body, 'side-closed-hover');
      this.renderer.addClass(
        this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(
          ['/authentication/signin']
        );
      }
    });
  }
}
