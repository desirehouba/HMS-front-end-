

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
  constructor(customers: Customers) {
    {
      this.id = customers.id || this.getRandomID();
      this.image = customers.image || 'assets/images/user/teacher.jpg';
      this.name = customers.name || '';
      this.cni = customers.cni || '';
      this.website = customers.website || '';
      this.mobile = customers.mobile || '';
      this.country = customers.country || '';
      this.city = customers.city || '';
      this.type = customers.type || '';
      this.address = customers.address || '';
      this.phone = customers.phone || '';
      this.email = customers.email || '';
      this.rc = customers.rc || '';
      this.niu = customers.niu ;
      this.idSchool = customers.idSchool ;
      this.idSection = customers.idSection ;
      this.created_by = customers.created_by ;
      this.updated_by = customers.updated_by ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
