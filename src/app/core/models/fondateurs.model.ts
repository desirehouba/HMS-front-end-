
export class Fondateurs {
  id: number;
  photo: string;
  name: string;
  email : string;
  username: string;
  password: string;
  phone: string;
  role: any;
  gender : string;
  country: string;
  city: string;
  role_id: number;
  birthday : Date;
  cni: string;
  nationality: string;
  address: string;
  idSchool : number;
  idSection : number;
  created_by:number;
  updated_by:number;
  constructor(fondateurs: Fondateurs) {
    {
      this.id = fondateurs.id || this.getRandomID();
      this.photo = fondateurs.photo || 'assets/images/user/fondateur.jpg';
      this.name = fondateurs.name || '';
      this.cni = fondateurs.cni || '';
      this.username = fondateurs.username || '';
      this.password = fondateurs.password || '';
      this.country = fondateurs.country || '';
      this.city = fondateurs.city || '';
      this.birthday = fondateurs.birthday || '';
      this.nationality = fondateurs.nationality || '';
      this.address = fondateurs.address || '';
      this.phone = fondateurs.phone || '';
      this.email = fondateurs.email || '';
      this.gender = fondateurs.gender || '';
      this.role = fondateurs.role;
      this.role_id = fondateurs.role_id ;
      this.idSchool = fondateurs.idSchool ;
      this.idSection = fondateurs.idSection ;
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
