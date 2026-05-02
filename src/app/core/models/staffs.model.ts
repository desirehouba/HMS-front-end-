import { Roles } from "./roles.model";


export class Staffs {
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
  city: string;
  birthday : Date;
  role : Roles;
  cni: string;
  idCycle: number;
  idLevel: number;
  nationality: string;
  address: string;
  idSchool : number;
  idSection : number;
  created_by:number;
  updated_by:number;
  constructor(staffs: Staffs) {
    {
      this.id = staffs.id || this.getRandomID();
      this.photo = staffs.photo || 'assets/images/user/staff.jpg';
      this.name = staffs.name || '';
      this.cni = staffs.cni || '';
      this.username = staffs.username || '';
      this.password = staffs.password || '';
      this.country = staffs.country || '';
      this.city = staffs.city || '';
      this.birthday = staffs.birthday || '';
      this.nationality = staffs.nationality || '';
      this.address = staffs.address || '';
      this.phone = staffs.phone || '';
      this.email = staffs.email || '';
      this.gender = staffs.gender || '';
      this.role = staffs.role || '';
      this.role_id = staffs.role_id ;
      this.idCycle = staffs.idCycle ;
      this.idLevel = staffs.idLevel ;
      this.idSchool = staffs.idSchool ;
      this.idSection = staffs.idSection ;
      this.created_by = staffs.created_by ;
      this.updated_by = staffs.updated_by ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
