import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BookingsService } from '../../bookings.service';
import {
  UntypedFormControl,Validators,
  UntypedFormGroup,UntypedFormBuilder,
} from '@angular/forms';
import { Bookings } from 'src/app/core/models/bookings.model';
import { ServicesService } from 'src/app/core/service/services.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { formatDate } from '@angular/common';
import { Rooms } from 'src/app/core/models/rooms.model';
import { CategoriesRooms } from 'src/app/core/models/categoriesRooms.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  bookings: Bookings;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormBookingDialogComponent {
  dialogTitle: string;
  bookingForm: UntypedFormGroup;
  bookings: Bookings;
  users: any[] = [];
  user = true;
  loading = false;
  filterRooms: Rooms[] = [];
  numbers = [1,2,3,4,5,6,7,8,9,10]
  SelectRooms: any[] = []
  categoriesRooms: CategoriesRooms[] = [];
  roomsControl = new UntypedFormControl();
  optionUser: any;
  filteredRooms!: Rooms[];  
  hide = true;
  room = true;
  files : any; 
  image = environment.imageDirectoryPatchs
  rooms: any[] = []; 
  typeRooms: any[] = [];
  istyperoom = true
  iscategorieroom = true 
  isLinear = false;
  constructor(
    public dialogRef: MatDialogRef<FormBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public bookingsService: BookingsService,
    private fb: UntypedFormBuilder,
    private servicesService : ServicesService,
    private authService : AuthService,
  ) {
    // Set the defaults
    this.dialogTitle = data.bookings.start_date;
    this.bookings = data.bookings;
    this.bookingForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.bookings.id],
      image: [this.bookings.image],
      end_date: [this.bookings.end_date],
      start_date: [this.bookings.start_date],
      user_id: [this.bookings.user.id],  
      number: [],
      room_type_id: [],
      room_category_id: [],
      capacity: [],
      vehicle_number: [this.bookings.arrival_time], 
      arrival_time: [this.bookings.arrival_time], 
      departure_time: [''], 
      transport_mode: [this.bookings.transport_mode], 
      arrivals: [''], 
      reduction_amount: [this.bookings.reduction_amount], 
      is_free: [this.bookings.is_free], 
      
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getUserss();
    this.getRoomss();
    this.getTypeRoomss();
    this.getCategoriesRoomss();
  }

  addRoom(data : any){
    this.SelectRooms.push(data);
  }
  removeRoom(data : any){
    this.SelectRooms.splice(this.filteredRooms.indexOf(data), 1);
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
    // methode pour lister les permissions

  getUserss() {
    const paylaod = {}
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.users = res.data;
        this.user = false;
      },
      error: (error) => {
        this.user = false;
      }, 
    });
  }

  getRoomss() {
    this.room = true; 
    const paylaod = {
      hotel_d: this.authService.currentUserValue.hotel_id,
      service_id: this.authService.currentUserValue.service_id,
      capacity : this.f['capacity'].value,
      room_type_id : this.f['room_type_id'].value,
      room_category_id : this.f['room_category_id'].value,
      status : "free",
    }
    this.servicesService.getObjetss(
      this.servicesService.route.rooms[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.room = false; 
        this.rooms = res.data;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.rooms = this.rooms.sort(SortArray);
        this.filteredRooms = this.rooms.sort(SortArray);
      },
    });
  } 
  get f() {
    return this.bookingForm.controls;
  }

  // consommation de api de update de user 

  bookingsActions() {
    this.loading = true;
    
    const bookingData = {
      reduction_amount: this.f['reduction_amount'].value,
      start_date: formatDate(this.f['start_date'].value,'YYYY-MM-dd', 'en-US'),
      end_date: formatDate(this.f['end_date'].value,'YYYY-MM-dd', 'en-US'),
      user_id: this.f['user_id'].value,
      rooms: this.bookings.booking_room_ids,
    };

    // envoie des données du formulaire à api

    this.servicesService.updateObjets(
      this.servicesService.route.bookings[0],
      this.bookings.id, bookingData
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
