


export class Teachers {
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
  cni: string;
  salary: number;
  matter: any;
  classesName: any[];
  idClassePrincipal: any;
  classes: any;
  grade: any;
  hourlyPrice: number;
  nationality: string;
  address: string;
  idSchool : number;
  idSection : number;
  created_by:number;
  updated_by:number;
  constructor(teachers: Teachers) {
    {
      this.id = teachers.id || this.getRandomID();
      this.photo = teachers.photo || 'assets/images/user/teacher.jpg';
      this.name = teachers.name || '';
      this.cni = teachers.cni || '';
      this.username = teachers.username || '';
      this.password = teachers.password || '';
      this.country = teachers.country || '';
      this.city = teachers.city || '';
      this.birthday = teachers.birthday || '';
      this.nationality = teachers.nationality || '';
      this.address = teachers.address || '';
      this.classesName = teachers.classesName;
      this.phone = teachers.phone || '';
      this.email = teachers.email || '';
      this.gender = teachers.gender || '';
      this.salary = teachers.salary ;
      this.hourlyPrice = teachers.hourlyPrice ;
      this.matter = teachers.matter ;
      this.classes = teachers.classes ;
      this.role_id = teachers.role_id ;
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
