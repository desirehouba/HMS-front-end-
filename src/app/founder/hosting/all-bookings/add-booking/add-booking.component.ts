import { Component } from '@angular/core';
import { UntypedFormBuilder,
  UntypedFormControl, UntypedFormGroup, Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common'; 
import { Rooms } from 'src/app/core/models/rooms.model';
import { CategoriesRooms } from 'src/app/core/models/categoriesRooms.model'; 
import { Direction } from '@angular/cdk/bidi';
import { MatDialog } from '@angular/material/dialog'; 
import { environment } from 'src/environments/environment';
import { AddCustomerFormDialogComponent } from 'src/app/founder/pop-up/add-customer/add-customer.component';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
})
export class AddBookingComponent {
  bookingForm: UntypedFormGroup; 
  loading = false;
  hide = true;
  room = true;
  files : any;
  users: any[] = [];
  rooms: any[] = [];
  numbers = [1,2,3,4,5,6,7,8,9,10]
  categoriesRooms: any[] = [];
  typeRooms: any[] = [];
  istyperoom = true
  iscategorieroom = true
  user = true
  isLinear = false;
  image!: any
  vide = {
    id:null,
    name: 'Tous/Toutes',
  }
  breadscrums = [
    {
      title: 'Add Booking',
      items: ['Booking'],
      active: 'Add Booking',
    },
  ];

  
  filterUsers!: any[]; 

  onInputChange(event: any) {

    const searchInput = event.target.value.toLowerCase();
    this.filterUsers = this.users.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChange(searchInput: any) {
    searchInput.value = "";
    this.filterUsers = this.users;
  }


  filterRooms: Rooms[] = [];
  SelectRooms: any[] = []
  roomsControl = new UntypedFormControl();
  optionUser: any;
  filteredRooms!: Rooms[]; 
  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    public dialog: MatDialog,
    private router : Router,
    private servicesService : ServicesService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
      this.image = environment.imageDirectoryPatchs
    this.bookingForm = this.fb.group({
      //rooms: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      number: [''],
      room_type_id: [''],
      room_category_id: [''], 
      capacity: [''], 
      vehicle_number: [''], 
      arrival_time: [''], 
      departure_time: [''], 
      transport_mode: [''], 
      arrivals: [''], 
      is_free: [false], 
      reduction_amount: [''], 
    }); 
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
    this.user = true;
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id,
      role_id: 5
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.users = res.data;
        this.user = false;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.users = this.users.sort(SortArray);
        this.filterUsers = this.users.sort(SortArray);
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
      service_id: 1,
      capacity : this.f['capacity'].value,
      floor : this.f['number'].value,
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

  editCall() {
    let row
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddCustomerFormDialogComponent, {
      data: {
        bookings: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getUserss();
      }
    });
  }

  
  get f() {
    return this.bookingForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/hosting/all-bookings"]
    );
  }

  // consommation de api de creation d'un privilige
  addBooking() {
    // stockage des données du formulaire dans un objet
    // de type booking qui sera envoyé a api
    let arrival_time
    if (this.f['arrival_time'].value != '') {
      arrival_time = formatDate(this.f['arrival_time'].value,'YYYY-MM-dd HH:mm', 'en-US')
    }
    const bookingData = { 
      vehicle_number: this.f['vehicle_number'].value,
      arrival_time: arrival_time,
      reduction_amount: this.f['reduction_amount'].value,
      transport_mode: this.f['transport_mode'].value,
      start_date: formatDate(this.f['start_date'].value,'YYYY-MM-dd', 'en-US'),
      end_date: formatDate(this.f['end_date'].value,'YYYY-MM-dd', 'en-US'),
      user_id: this.f['user_id'].value,
      is_free: this.f['is_free'].value,
      rooms: this.SelectRooms,
    };
    this.loading = true;
    let bookingDatas = { bookings: [bookingData] };
    // api de creation d'un booking 
    this.servicesService.addObjets(
      this.servicesService.route.bookings[0], bookingData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.cancel();
      },
      error: (error) => {
        this.loading = false; 
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
