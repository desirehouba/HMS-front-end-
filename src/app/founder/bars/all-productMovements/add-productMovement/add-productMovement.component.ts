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
import { formatDate } from "@angular/common"; 
import { Products } from "src/app/core/models/products.model"; 

@Component({
  selector: "app-add-productMovement",
  templateUrl: "./add-productMovement.component.html",
  styleUrls: ["./add-productMovement.component.scss"],
})
export class AddProductMovementComponent {
  productMovementForm: UntypedFormGroup;

  products: Products[] = [];
  filteredProducts: Products[] = [];
  searchProduct: string = "";
  services: any[] = [];
  users: any[] = []; 
  user = false;
  loading = false;
  service = false;
  product = false;
  scholar_level = "";
  breadscrums = [
    {
      title: "Add Rating",
      items: ["Rating"],
      active: "Add Rating",
    },
  ];

  onInputChange(event: any) {

    const searchInput = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChange(searchInput: any) {
    searchInput.value = "";
    this.filteredProducts = this.products;
  }
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
    this.productMovementForm = this.fb.group({
      responsible_id: [0, [Validators.required]],
      quantity: ['', [Validators.required]],
      description: ['', [Validators.required]], 
      product_id: ['', [Validators.required]],
      operation_type: ['entry', [Validators.required]],
      service_id:['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getProductss();
    this.getUserss(); 
    this.getServicess(); 
  }


  getProductss() {
    this.product = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id,
      service_id : this.f['service_id'].value,
    }
    this.servicesService.getObjetss(
      this.servicesService.route.products[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.products = res.data;
        this.product = false; 
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.products = this.products.sort(SortArray);
        this.filteredProducts = this.products;
      },
    });
  }

  getUserss() {
    this.user = true;
    const paylaod = {
      hotel_id: this.authService.currentUserValue.hotel_id,
      role_types: ["Staffs", "Direction"],
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.users = res.data;
        this.user = false;
      },
    });
  }

  getServicess() {
    this.service = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id, 
    }
    this.servicesService.getObjetss(
      this.servicesService.route.departements[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.services = res.data;
        this.service = false;
      },
    });
  }


  get f() {
    return this.productMovementForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/bars/all-productMovements"]
    );
  }

  // consommation de api de creation d'un productMovement
  addProductMovements() {
    // stockage des données du formulaire dans un objet
    // de type productMovement qui sera envoyé a api
    let test = true
    this.loading = true;
    const productMovementData = {
      quantity: this.f['quantity'].value,
      operation_type: this.f['operation_type'].value,
      description: this.f['description'].value,
      product_id : this.f['product_id'].value,
      responsible_id : this.f['responsible_id'].value,
    };
    
    
    this.servicesService.addObjets(
      this.servicesService.route.productMovements[0], productMovementData
    ).subscribe({
      next: (data) => {
        this.loading = false; 
        this.servicesService.showCustomPosition();
      },
      error: (error) => {
        this.loading = false;
        this.servicesService.showCustomPositionEchec(error);
      }, 
    }); 
  }
}
