
export class Users {
  id: number;
  photo: string;
  name:any
  firstname: string;
  email : string;
  lastname: string;
  password: string;
  phone: string;
  phone2: any;
  type: any;
  responsible : any
  gender : string;
  country: string;
  city: string;
  ancienneté : any
  nui : any
  birth_place: any
  passport_issue_date: any;
  passport_issue_place : any
  cnps : any
  profession : any 
  role:any;
  birthday : Date;
  cni: string;
  nationality: string;
  address: string;
  connexion_type : string;
  service : any;
  created_by:number;
  updated_by:number;
  constructor(fondateurs: Users) {
    {
      this.id = fondateurs.id || this.getRandomID();
      this.photo = fondateurs.photo || 'assets/images/user/fondateur.jpg';
      this.firstname = fondateurs.firstname || '';
      this.cni = fondateurs.cni || '';
      this.lastname = fondateurs.lastname || '';
      this.password = fondateurs.password || '';
      this.country = fondateurs.country || '';
      this.city = fondateurs.city || '';
      this.birthday = fondateurs.birthday || '';
      this.nationality = fondateurs.nationality || '';
      this.address = fondateurs.address || '';
      this.phone = fondateurs.phone || '';
      this.email = fondateurs.email || '';
      this.gender = fondateurs.gender || '';
      this.phone2 = fondateurs.phone2;
      this.role = fondateurs.role ;
      this.connexion_type = fondateurs.connexion_type ;
      this.created_by = fondateurs.created_by ;
      this.updated_by = fondateurs.updated_by ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
