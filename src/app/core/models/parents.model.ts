
export class Parents {
  id: number;
  photo: string;
  name: string;
  email : string;
  username: string;
  password: string;
  phone: string;
  role_id: number;
  gender : string;
  country: string;
  phone_2: any;
  phone_3: any;
  phone_4: any;
  phone_5: any;
  phone_6: any;
  tutor: string;
  mother: string;
  city: string;
  birthday : Date;
  cni: string;
  nationality: string;
  address: string;
  idSchool : number;
  idSection : number;
  created_by:number;
  updated_by:number;
  constructor(parents: Parents) {
    {
      this.id = parents.id || this.getRandomID();
      this.photo = parents.photo || 'assets/images/user/parent.jpg';
      this.name = parents.name || '';
      this.cni = parents.cni || '';
      this.phone_2 = parents.phone_2;
      this.phone_3 = parents.phone_3;
      this.phone_4 = parents.phone_4;
      this.phone_5 = parents.phone_5;
      this.phone_6 = parents.phone_6;
      this.mother = parents.mother || '';
      this.tutor = parents.tutor || '';
      this.username = parents.username || '';
      this.password = parents.password || '';
      this.country = parents.country || '';
      this.city = parents.city || '';
      this.birthday = parents.birthday || '';
      this.nationality = parents.nationality || '';
      this.address = parents.address || '';
      this.phone = parents.phone || '';
      this.email = parents.email || '';
      this.gender = parents.gender || '';
      this.role_id = parents.role_id ;
      this.idSchool = parents.idSchool ;
      this.idSection = parents.idSection ;
      this.created_by = parents.created_by ;
      this.updated_by = parents.updated_by ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
