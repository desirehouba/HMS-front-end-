import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RoomsService } from '../../rooms.service';
import { UntypedFormControl,Validators,
  UntypedFormGroup,UntypedFormBuilder, } from '@angular/forms';
import { Rooms } from 'src/app/core/models/rooms.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { TypeRooms } from 'src/app/core/models/typeRooms.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { CategoriesRooms } from 'src/app/core/models/categoriesRooms.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  rooms: Rooms;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogRoomComponent {
  dialogTitle: string;
  roomForm: UntypedFormGroup;
  rooms: Rooms;
  categoriesRooms: CategoriesRooms[] = [];
  typeRooms: TypeRooms[] = [];
  istyperoom = true;
  loading = false;
  photo!:any
  image!:any
  constructor(
    public dialogRef: MatDialogRef<FormDialogRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public roomsService: RoomsService,
    private fb: UntypedFormBuilder,
    private servicesService : ServicesService,
    private authService : AuthService,
  ) {
    // Set the defaults
    this.dialogTitle = data.rooms.name;
    this.rooms = data.rooms;
    this.roomForm = this.createContactForm();
    this.image = environment.imageDirectoryPatchs
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.rooms.id],
      photo: [this.rooms.image],
      name: [this.rooms.name],
      capacity: [this.rooms.capacity],
      room_type_id: [this.rooms.room_type.id],
      room_category_id: [this.rooms.room_category.id],
      price: [this.rooms.price],
      status: [this.rooms.status],
      number: [this.rooms.floor],
      description : [this.rooms.description],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getTypeRoomss();
    this.getCategoriesRoomss();
  }
   // methode pour lister les permissions

  getTypeRoomss() {
    const paylaod = {}
    this.servicesService.getObjetss(
      this.servicesService.route.typeRooms[1], paylaod
    ).subscribe({
      next: (res) => {
        this.typeRooms = res.data;
        this.istyperoom = false;
      },
      error: (error) => {
        this.istyperoom = false;
      }, 
    });
  }
  
  getCategoriesRoomss() {
    const paylaod = {}
    this.servicesService.getObjetss(
      this.servicesService.route.categoriesRooms[1], paylaod
    ).subscribe({
      next: (res) => {
        this.categoriesRooms = res.data;
        this.istyperoom = false;
      },
      error: (error) => {
        this.istyperoom = false;
      }, 
    });
  }

  get f() {
    return this.roomForm.controls;
  }

  // consommation de api de update de user 

  roomsActions() {
    if (this.f['photo'].value === this.rooms.image){
      this.photo = this.rooms.image;
    } else if (this.f['photo'].value != '' && this.f['photo'].value != undefined){
      let photo = new FormData();
      photo.append(
        "photo", 
        this.f['photo'].value, 
        this.f['photo'].value.name
      );
      this.photo = this.f['photo'].value.name;
      this.servicesService.addphoto(photo).subscribe({
        next: (res) => {}
      });
    }
    this.loading = true;
    const roomData = {
      image: this.photo,
      room_type_id: this.f['room_type_id'].value,
      room_category_id: this.f['room_category_id'].value,
      floor: this.f['number'].value,
      //number: this.f['number'].value,
      price: this.f['price'].value,
      capacity: this.f['capacity'].value,
      status: this.rooms.status,
      description: this.f['description'].value,
      service_id: 1,
      name: this.f['name'].value,
      hotel_id : this.authService.currentUserValue.hotel_id,
    };

    // envoie des données du formulaire à api

    this.servicesService.updateObjets(
      this.servicesService.route.rooms[0],
      this.rooms.id, roomData
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
