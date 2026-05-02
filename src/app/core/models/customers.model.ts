

export class Customers {
  id: number;
  image: string;
  name: string;
  email : string;
  website: string;
  mobile: string;
  phone: string;
  type: string;
  rc: string;
  country: string;
  city: string;
  niu : string;
  cni: string;
  address: string;
  idSchool : number;
  idSection : number;
  created_by:number;
  updated_by:number;
  constructor(teachers: Customers) {
    {
      this.id = teachers.id || this.getRandomID();
      this.image = teachers.image || 'assets/images/user/teacher.jpg';
      this.name = teachers.name || '';
      this.cni = teachers.cni || '';
      this.website = teachers.website || '';
      this.mobile = teachers.mobile || '';
      this.country = teachers.country || '';
      this.city = teachers.city || '';
      this.type = teachers.type || '';
      this.address = teachers.address || '';
      this.phone = teachers.phone || '';
      this.email = teachers.email || '';
      this.rc = teachers.rc || '';
      this.niu = teachers.niu ;
      this.idSchool = teachers.idSchool ;
      this.idSection = teachers.idSection ;
      this.created_by = teachers.created_by ;
      this.updated_by = teachers.updated_by ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
