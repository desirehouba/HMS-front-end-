import { Component } from '@angular/core';
import { UntypedFormBuilder,
  UntypedFormControl, UntypedFormGroup, Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/core/service/services.service';
import { formatDate } from '@angular/common';
import { CategoriesRooms } from 'src/app/core/models/categoriesRooms.model';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent {
  roomForm: UntypedFormGroup;
  loading = false;
  hide = true;
  files : any;
  categoriesRooms: CategoriesRooms[] = [];
  typeRooms: any[] = [];
  istyperoom = true
  iscategorieroom = true
  breadscrums = [
    {
      title: 'Add Room',
      items: ['Room'],
      active: 'Add Room',
    },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private router : Router,
    private servicesService : ServicesService,
    public translateService : TranslateService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem('lang') as string);
    this.roomForm = this.fb.group({
      photo: [''],
      name: ['', [Validators.required]],
      number: [''],
      room_type_id: ['', [Validators.required]],
      room_category_id: ['', [Validators.required]],
      price: ['', [Validators.required]],
      capacity: [1, [Validators.required]],
      description: ['', [Validators.required]],
    });
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

  cancel() {
    this.router.navigate(
      ["/founder/hosting/all-rooms"]
    );
  }

  // consommation de api de creation d'un privilige
  addRoom() {
    // stockage des données du formulaire dans un objet
    this.loading = true;
    let photo = new FormData();
    let image 
    // enregistrement de la photo du user 
    if (this.f['photo'].value != ''){
      image = this.f['photo'].value.name
      photo.append("photo",
        this.f['photo'].value,
        this.f['photo'].value.name
      );
      this.servicesService.addphoto(photo)
      .subscribe({
        next: (res) => { }
      });
    } else {
      image = 'user.jpg'
    }
    const roomData = {
      image: image,
      room_type_id: this.f['room_type_id'].value,
      room_category_id: this.f['room_category_id'].value,
      floor: this.f['number'].value,
      price: this.f['price'].value,
      capacity: this.f['capacity'].value,
      status: "free",
      description: this.f['description'].value,
      service_id: 1,
      name: this.f['name'].value,
      hotel_id : this.authService.currentUserValue.hotel_id,
    };
    this.loading = true;
    let roomDatas = { rooms: [roomData] };
    // api de creation d'un room 
    this.servicesService.addObjets(
      this.servicesService.route.rooms[0], roomDatas
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
