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
  selector: "app-add-feedback",
  templateUrl: "./add-feedback.component.html",
  styleUrls: ["./add-feedback.component.scss"],
})
export class AddFeedbackComponent {
  ratingForm: UntypedFormGroup;
  services: any[] = [];
  numbersFeedback = [1,2,3,4,5,6,7,8,9,10]
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
      message: ['', [Validators.required]],
      service_id: ['', [Validators.required]],
      is_anonyme : [false, [Validators.required]],
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

  get f() {
    return this.ratingForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/hosting/all-feedbacks"]
    );
  }

  // consommation de api de creation d'un rating
  addFeedback() {
    // stockage des données du formulaire dans un objet
    // de type rating qui sera envoyé a api 
    this.loading = true;
    const payload = { 
      message: this.f['message'].value,
      is_anonyme: this.f['is_anonyme'].value,
      service_id : this.f['service_id'].value,
    };  
    this.servicesService.addObjets(
      this.servicesService.route.feedbacks[0], payload
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
