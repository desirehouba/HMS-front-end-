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
import { Articles } from "src/app/core/models/articles.model";

@Component({
  selector: "app-add-voucher",
  templateUrl: "./add-voucher.component.html",
  styleUrls: ["./add-voucher.component.scss"],
})
export class AddVouchersComponent {
  voucherForm: UntypedFormGroup;

  articles: Articles[] = [];
  voucherArrys: any[] = [];
  responsables: any[] = [];
  users: any[] = [];
  filterUsers: any[] = [];
  filterSuppliers: any[] = [];
  filterArticles: any[] = [];
  suppliers: any[] = [];
  numbersVouchers = [1,2,3,4,5,6,7,8,9,10]
  voucherData: any;
  hide = false;
  loading = false;
  responsable = false;
  supplier = false;
  user = false;
  article = false;
  scholar_level = "";
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

  onInputChangeSupplier(event: any) {

    const searchInput = event.target.value.toLowerCase();
    this.filterSuppliers = this.suppliers.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChangeSupplier(searchInput: any) {
    searchInput.value = "";
    this.filterSuppliers = this.suppliers;
  }

  onInputChangeArticle(event: any) {
    const searchInput = event.target.value.toLowerCase();
    this.filterArticles = this.articles.filter(({ name }) => {
      const noms = name.toLowerCase();
      return noms.includes(searchInput);
    });
  }

  onOpenChangeArticle(searchInput: any) {
    searchInput.value = "";
    this.filterArticles = this.articles;
  }


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
    this.voucherForm = this.fb.group({
      responsible_id: ["", [Validators.required]],
      supplier_id: ["", [Validators.required]],
      nbrVoucher: [0, [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getArticless();
    this.getSupplierss();
    this.getUserss(); 
  }


  getArticless() {
    this.article = true;
    const paylaod = {
      hotel_id : this.authService.currentUserValue.hotel_id, 
    }
    this.servicesService.getObjetss(
      this.servicesService.route.articles[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.articles = res.data;
        this.article = false;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.articles = this.articles.sort(SortArray);
        this.filterArticles = this.articles.sort(SortArray);
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
        this.filterUsers = this.users.sort(SortArray);
      },
    });
  }

  getSupplierss() {
    this.supplier = true;
    const paylaod = {
      role_types : ["Supplier" ]
    }
    this.servicesService.getObjetss(
      this.servicesService.route.users[1],
      paylaod
    ).subscribe({
      next: (res) => {
        this.suppliers = res.data;
        this.supplier = false;
        function SortArray(x:any, y:any){
          return x.name.localeCompare(y.name);
        }
        this.suppliers = this.suppliers.sort(SortArray);
        this.filterSuppliers= this.suppliers.sort(SortArray);
      },
    });
  } 

  getVouchers() {
    this.voucherArrys = [];
    for (let voucher = 1; voucher <= this.f['nbrVoucher'].value; voucher++) {
      let paylaod = {
        id: null,
        unit_price: null,
        quantity : null,
      };
      this.voucherArrys.push(paylaod);
    }
  }


  onEditInit(event: any): void {}

  onEditCancel(event: any): void {}

  get f() {
    return this.voucherForm.controls;
  }

  cancel() {
    this.router.navigate(
      ["/founder/stocks/all-vouchers"]
    );
  }

  // consommation de api de creation d'un voucher
  addVouchers() {
    // stockage des données du formulaire dans un objet
    // de type voucher qui sera envoyé a api
    let test = true
    this.loading = true;
    for (let voucher of this.voucherArrys) {
      if ( voucher.id === null || voucher.quantity === null || voucher.unit_price === null ) {
        this.servicesService.showCustomPositionEchec('vous devez remplir toutes les lignes');
        test = false
      } else{
        test = false
        this.voucherData = {
          responsible_id: this.f['responsible_id'].value,
          supplier_id: this.f['supplier_id'].value,
          description: this.f['description'].value,
          priority: this.f['priority'].value,
          articles : this.voucherArrys,
        };
      }
    }
    
    if (!test) {
      this.servicesService.addObjets(
        this.servicesService.route.vouchers[0], this.voucherData
      ).subscribe({
        next: (data) => {
          this.loading = false;
          this.voucherArrys = [];
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
}
