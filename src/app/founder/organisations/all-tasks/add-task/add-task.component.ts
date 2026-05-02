import { Component } from '@angular/core';
import {UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { Users } from 'src/app/core/models/users.model';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  taskForm: UntypedFormGroup;
  users: any[] = [];
  loading = false;
  user =  false;
  breadscrums = [
    {
      title: 'Add Task',
      items: ['Task'],
      active: 'Add Task',
    },
  ];
  filterUsers: Users[] = [];

  usersControl = new UntypedFormControl();
  optionUser: any;
  filteredUsers!: Users[];

  selectionChangeUsers(options: MatListOption[]) {
    const optionUser = options[0];
    let value = this.usersControl.value || [];
    if (optionUser.selected) value.push(optionUser.value);
    else value = value.filter((x: any) => x != optionUser.value);
    this.usersControl.setValue(value);
  }

  onInputChangeUsers(event: any) {
    let i: number
    const searchInput = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter(({ firstname }) => {
      const noms = firstname.toLowerCase();
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
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      due_date: ['', [Validators.required]],
      status: [''],
      priority: ['', [Validators.required]],
      users: ['', [Validators.required]],
      estimation: [''],
      idProject: [''],
      duree_mise: [''],
      observation: [''],
      responsible_id: [''],
    });
  }

  ngOnInit(): void {
    this.getUserss();
  }

  getUserss() {
    this.user = true; 
    const paylaod = {
      hotel_d: this.authService.currentUserValue.hotel_id,
      role_types: ["Staffs", "Direction"],
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.user = false; 
        this.users = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.users = this.users.sort(SortArray);
        this.filteredUsers = this.users.sort(SortArray);
      },
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/organisations/all-tasks"]
    );
  }

  // consommation de api de creation d'un privilige
  addTask() {
    // stockage des données du formulaire dans un objet
    // de type task qui sera envoyé a api
    
    const taskData = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      due_date: formatDate(this.f['due_date'].value,'YYYY-MM-dd', 'en-US'),
      priority: this.f['priority'].value,
      responsible_id: this.f['responsible_id'].value,
      estimation: this.f['estimation'].value,
      user_ids: this.f['users'].value,
    };
    this.loading = true;
    let taskDatas = { tasks: [taskData] };
    this.servicesService.addObjets(
      this.servicesService.route.tasks[0],
      taskData
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
