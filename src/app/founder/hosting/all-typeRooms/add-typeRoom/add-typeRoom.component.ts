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
  selector: "app-add-typeRoom",
  templateUrl: "./add-typeRoom.component.html",
  styleUrls: ["./add-typeRoom.component.scss"],
})
export class AddTypeRoomComponent {
  ratingForm: UntypedFormGroup;
  ratings: any[] = [];
  numbersTypeRoom = [1,2,3,4,5,6,7,8,9,10]
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
      nbrTypeRoom: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.scholar_level = this.authService.currentUserValue.scholar_level
  }

  getTypeRoom() {
    this.ratings = [];
    for (let typeRoom = 1; typeRoom <= this.f['nbrTypeRoom'].value; typeRoom++) {
      let paylaod = {
        name: null,
        description : null,
        hotel_id: this.authService.currentUserValue.hotel_id,
      };
      this.ratings.push(paylaod);
    }
  }


  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.ratingForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/hosting/all-rooms/all-typeRooms"]
    );
  }

  // consommation de api de creation d'un rating
  addTypeRoom() {
    // stockage des données du formulaire dans un objet
    // de type rating qui sera envoyé a api
    let test = false
    this.loading = true;
    for (let typeRoom of this.ratings) {
      if (typeRoom.name === null) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = true
      }
    }
    if (!test) {
      let typeRoomDate = { room_types: this.ratings };
      this.servicesService.addObjets(
        this.servicesService.route.typeRooms[0], typeRoomDate
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
}
