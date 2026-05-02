import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FondateursService } from '../../fondateurs.service';
import { UntypedFormControl, Validators,
  UntypedFormGroup, UntypedFormBuilder,
} from '@angular/forms';
import { Roles } from 'src/app/core/models/roles.model';
import { Fondateurs } from 'src/app/core/models/fondateurs.model';
import { ServicesService } from 'src/app/core/service/services.service';

export interface DialogData {
  id: number;
  action: string;
  fondateurs: Fondateurs;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  dialogTitle: string;
  fondateurForm: UntypedFormGroup;
  fondateurs: Fondateurs;
  sexe = [ 'Male', 'Female' ];
  roles: Roles[] = [];
  hide = true;
  photo: any;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fondateursService: FondateursService,
    private fb: UntypedFormBuilder,
    public servicesService : ServicesService
  ) {
    this.dialogTitle = data.fondateurs.name;
    this.fondateurs = data.fondateurs;
    this.fondateurForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.fondateurs.id],
      photo: [this.fondateurs.photo],
      name: [this.fondateurs.name],
      cni: [this.fondateurs.cni],
      username: [this.fondateurs.username],
      password: [this.fondateurs.password],
      country: [this.fondateurs.country],
      city: [this.fondateurs.city],
      nationality: [this.fondateurs.nationality],
      address: [this.fondateurs.address],
      phone: [this.fondateurs.phone],
      email : [this.fondateurs.email, [Validators.email, Validators.minLength(5)]],
      gender : [this.fondateurs.gender],
      birthday: [this.fondateurs.birthday],
      role: [this.fondateurs.role_id]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.getRoless();
  }

   // methode pour lister les permissions
  getRoless() {
    const paylaod = {}
    this.servicesService.getRoless(paylaod
    ).subscribe({
      next: (res) => {
        this.roles = res.data;
      },
    });
  }

  get f() {
    return this.fondateurForm.controls;
  }

  // consommation de api de creation d'un privilige
  updateFondateurs() {
    // stockage des données du formulaire dans un objet
    // de type fondateur qui sera envoyé a api
    if (this.f['photo'].value === this.fondateurs.photo){
      this.photo = this.fondateurs.photo;
    } else {
      let photo = new FormData();
      photo.append("photo",
        this.f['photo'].value,
        this.f['photo'].value.name);
      this.photo = this.f['photo'].value.name;
      this.servicesService.addphoto(photo
      ).subscribe({
        next: (res) => { }
      });
    }

    this.loading = true;
    
    const fondateurData = {
      photo: this.photo,
      name: this.f['name'].value,
      cni: this.f['cni'].value,
      username: this.f['username'].value,
      password: this.f['password'].value,
      country: this.f['country'].value,
      city: this.f['city'].value,
      nationality: this.f['nationality'].value,
      address: this.f['address'].value,
      phone : this.f['phone'].value,
      email: this.f['email'].value,
      gender: this.f['gender'].value,
      birthday: this.f['birthday'].value,
      role : this.f['role'].value,
      idSchool : this.fondateurs.idSchool,
      idSection : this.fondateurs.idSection,
    };

    console.log(fondateurData);
    
    // envoie des données du formulaire à api
    this.servicesService.updateObjets(
      this.servicesService.route.users[1],
      this.fondateurs.id, fondateurData
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
