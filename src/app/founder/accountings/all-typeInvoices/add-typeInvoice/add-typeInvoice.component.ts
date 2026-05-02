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
  selector: "app-add-typeInvoice",
  templateUrl: "./add-typeInvoice.component.html",
  styleUrls: ["./add-typeInvoice.component.scss"],
})
export class AddTypeInvoiceComponent {
  ratingForm: UntypedFormGroup;
  ratings: any[] = [];
  numbersTypeInvoice = [1,2,3,4,5,6,7,8,9,10]
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
      nbrTypeInvoice: [0, [Validators.required]],
      /* name: [ '', [Validators.required]],
      category: ['', [Validators.required]], */
      //type: [ '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.scholar_level = this.authService.currentUserValue.scholar_level
  }

  getTypeInvoice() {
    this.ratings = [];
    for (let typeInvoice = 1; typeInvoice <= this.f['nbrTypeInvoice'].value; typeInvoice++) {
      let paylaod = {
        name: null,
        code : null,
        category : null, 
        idSchool : this.authService.currentUserValue.idSchool,
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
      ["/founder/accountings/all-typeInvoices"]
    );
  }

  // consommation de api de creation d'un rating
  addTypeInvoice() {
    // stockage des données du formulaire dans un objet
    // de type rating qui sera envoyé a api
    let test = false
    this.loading = true;
    for (let typeInvoice of this.ratings) {
      if (typeInvoice.name === null || typeInvoice.category === null || typeInvoice.code === null) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = true
      }
    }
    if (!test) {
      let typeInvoiceDate = { type_invoices: this.ratings };
      //fo
      this.servicesService.addObjets(
        this.servicesService.route.expenseTypes[0], typeInvoiceDate
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
