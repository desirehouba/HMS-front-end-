import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TasksService } from '../../tasks.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Tasks } from 'src/app/core/models/tasks.mode';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { Users } from 'src/app/core/models/users.model';
import { MatListOption } from '@angular/material/list';

export interface DialogData {
  id: number;
  action: string;
  tasks: Tasks;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class TasksFormDialogComponent {
  dialogTitle: string;
  taskForm: UntypedFormGroup;
  tasks: Tasks;
  users: any[] = [];
  loading = false;
  user =  false;
  responsible!:null
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
    this.filteredUsers = this.users.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }
  constructor(
    public dialogRef: MatDialogRef<TasksFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public tasksService: TasksService,
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private servicesService : ServicesService
  ) {
    this.dialogTitle = data.tasks.name;
    this.tasks = data.tasks;
    this.taskForm = this.createContactForm();
    if (this.tasks.responsible != null) {
      this.responsible = this.tasks.responsible.id;
    }
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.tasks.id],
      name: [this.tasks.name],
      description: [this.tasks.description],
      due_date: [this.tasks.due_date],
      responsible_id: [this.responsible],
      priority: [this.tasks.priority],
      status: [this.tasks.status],
      estimation: [this.tasks.estimation],
      duree_mise: [this.tasks.time_spent],
      users: [this.tasks.users],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getUserss();
  }

  getUsers() {
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id,
      role_types: ["Staffs", "Direction"],
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.users = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.users = this.users.sort(SortArray);
        this.filteredUsers = this.users.sort(SortArray);
        this.usersControl.setValue(this.tasks.users);
      },
    });
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
        this.usersControl.setValue(this.tasks.users);
      },
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateTasks() {
    // stockage des données du formulaire dans un objet
    // de type task qui sera envoyé a api
    this.loading = true;
    const taskData = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      due_date: formatDate(this.f['due_date'].value,'YYYY-MM-dd', 'en-US'),
      priority: this.f['priority'].value,
      responsible_id: this.f['responsible_id'].value,
      status: this.f['status'].value,
      user_ids: this.usersControl.value,
    };
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.tasks[0],
      this.tasks.id, taskData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      },
    });
  }
}
