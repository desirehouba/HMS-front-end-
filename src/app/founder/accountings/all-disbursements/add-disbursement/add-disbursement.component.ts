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
import { Products } from "src/app/core/models/products.model";
import { Rooms } from "src/app/core/models/rooms.model";
import { Direction } from "@angular/cdk/bidi";
import { MatDialog } from "@angular/material/dialog";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-add-disbursement",
  templateUrl: "./add-disbursement.component.html",
  styleUrls: ["./add-disbursement.component.scss"],
})
export class AddDisbursementComponent {
  disbursementForm: UntypedFormGroup;

  products: Products[] = [];
  users: Rooms[] = [];
  expenseTypes: any[] = [];
  services: any[] = [];
  disbursementArrys: any[] = [];
  numbersDisbursements = [1,2,3,4,5,6,7,8,9,10]
  disbursementData: any;
  user = false;
  loading = false;
  isServiceLoading = false;
  isexpenseType = false;
  product = false;
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
    public dialog: MatDialog,
    public translateService: TranslateService,
    private servicesService: ServicesService
  ) {
    translateService.setDefaultLang(
      localStorage.getItem("lang") as string
    );
    this.disbursementForm = this.fb.group({
      payment_method: ['', [Validators.required]],
      responsible_id: ['', [Validators.required]],   
      expense_type_id: ['', [Validators.required]],
      total_amount: ['', [Validators.required]],
      reasons: ['', [Validators.required]],
      date: ['', [Validators.required]],
      photo: [''],
      service_id: ['', [Validators.required]],
      //user_id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getExpenseTypess();
    this.getUserss(); 
    this.getServicess()
  }

  getServicess() {
    this.isServiceLoading = true
    const paylaod = { 
      hotel_id : this.authService.currentUserValue.hotel_id
    }
    this.servicesService.getObjetss(
      this.servicesService.route.departements[1], paylaod
    ).subscribe({
      next: (res) => {
        this.services = res.data;
        this.isServiceLoading = false
      },
    });
  }


  getExpenseTypess() {
    this.isexpenseType = true; 
    const paylaod = {}
    this.servicesService.getObjetss(
      this.servicesService.route.expenseTypes[1], paylaod
    ).subscribe({
      next: (res) => {
        this.expenseTypes = res.data;
        this.isexpenseType = false; 
      },
      error: (error) => {
        this.isexpenseType = false;
      }, 
    });
  }

  getUserss() {
    this.user = true
    const paylaod = {
      role_types : ["Direction", "Staffs"]
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1], paylaod
    ).subscribe({
      next: (res) => {
        this.users = res.data;
        this.user = false
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.users = this.users.sort(SortArray);
      },
    });
  }
  

  get f() {
    return this.disbursementForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/accountings/all-disbursements"]
    );
  }

  // consommation de api de creation d'un disbursement
  addDisbursements() {
    // stockage des données du formulaire dans un objet
    // de type disbursement qui sera envoyé a api 
    this.loading = true;
    let photo = new FormData();
    let image
    // enregistrement de la photo du user 

    if (this.f['photo'].value != '' && this.f['photo'].value != undefined) {
      image = this.f['photo'].value.name;
      photo.append("photo",
        this.f['photo'].value,
        this.f['photo'].value.name
      );
      this.servicesService.addphoto(photo)
      .subscribe({
        next: (res) => { }
      });
    }
    
    const disbursementData = {
      invoice_image: image,
      expense_type_id: this.f['expense_type_id'].value,
      disbursement_date:formatDate(this.f['date'].value,'YYYY-MM-dd', 'en-US'),
      payment_method: this.f['payment_method'].value,
      total_amount: this.f['total_amount'].value,
      responsible_id: this.f['responsible_id'].value,
      reasons : this.f['reasons'].value,
      service_id : this.f['service_id'].value, 
      //user_id : this.f['user_id'].value,
    }; 
    this.servicesService.addObjets(
      this.servicesService.route.disbursements[0], disbursementData
    ).subscribe({
      next: (data) => {
        this.loading = false;
        this.servicesService.showCustomPosition();
        this.disbursementForm.reset();
      },
      error: (error) => {
        this.loading = false;
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
