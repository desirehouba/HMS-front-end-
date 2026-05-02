import { Component } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { ServicesService } from "src/app/core/service/services.service"

@Component({
  selector: "app-add-roomService",
  templateUrl: "./add-roomService.component.html",
  styleUrls: ["./add-roomService.component.scss"],
})
export class AddRoomServiceComponent {
  ratingForm: UntypedFormGroup;
  services: any[] = [];
  numbersRoomService = [1,2,3,4,5,6,7,8,9,10]
  loading = false;
  scholar_level = "";
  breadscrums = [
    {
      title: "Add Rating",
      items: ["Rating"],
      active: "Add Rating",
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    public translateService: TranslateService,
    private servicesService: ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem("lang") as string
    );
    this.ratingForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      service_id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { 
    this.getServicess();
  }

  getServicess() {
    const paylaod = { 
      hotel_id : this.authService.currentUserValue.hotel_id
    }
    this.servicesService.getObjetss(
      this.servicesService.route.departements[1], paylaod
    ).subscribe({
      next: (res) => {
        this.services = res.data;
      },
    });
  }


  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.ratingForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/hosting/all-roomServices"]
    );
  }

  // consommation de api de creation d'un rating
  addRoomService() {
    // stockage des données du formulaire dans un objet
    // de type rating qui sera envoyé a api 
    this.loading = true;
    const payload = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      service_id : this.f['service_id'].value,
      price: 1
    }; 
    let roomServiceDate = { room_services: [payload] };
    this.servicesService.addObjets(
      this.servicesService.route.roomServices[0], roomServiceDate
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
