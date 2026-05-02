import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Users } from 'src/app/core/models/users.model';
import { environment } from 'src/environments/environment';
import { ServicesService } from 'src/app/core/service/services.service';

export interface DialogData {
  id: number;
  action: string;
  staffs: Users;
}

@Component({
  selector: 'app-about-staff',
  templateUrl: './about-staff.component.html',
  styleUrls: ['./about-staff.component.scss'],
})
export class AboutStaffComponent {
  dialogTitle: string;
  staffs: Users;
  image: any;
  role: any = {}
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<AboutStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public servicesService: ServicesService,
  ) {
    this.image = environment.imageDirectoryPatchs+data.staffs.photo
    this.dialogTitle = data.staffs.name;
    this.staffs = data.staffs;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    //his.getRoless() 
  }

 /*  getRoless() {
    this.loading = true;
    this.servicesService.getObjetss(
      this.servicesService.route.roles[1], {}
    ).subscribe({
      next: (res) => {
        for (let role of res.data) {
          if (role.id === this.staffs.id) {
            this.role = role
          }
        }
        this.loading = false;
      },
    });
  } */
}
