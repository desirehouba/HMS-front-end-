

export class Students {
  id: number;
  photo: string;
  name: string;
  email : string;
  username: string;
  password: string;
  phone: string;
  cni: string;
  role_id: number;
  gender : string;
  birthday : string;
  nationality: string;
  address: string;
  idOptionLevel: number;
  classe : any;
  classe2 : any;
  level: any;
  bourse: any;
  isBourseUsed: boolean;
  idParent: number;
  idSchool : number;
  idSection : number;
  matricule: string;
  desease: any;
  placeofbirth :any;
  situation:any;
  repeater:any;
  created_by:number;
  updated_by:number;
  constructor(students: Students) {
    {
      this.id = students.id || this.getRandomID();
      this.photo = students.photo || 'assets/images/user/student.jpg';
      this.name = students.name || '';
      this.idParent = students.idParent;
      this.username = students.username || '';
      this.password = students.password || '';
      this.idOptionLevel = students.idOptionLevel;
      this.cni = students.cni;
      this.classe2 = students.classe2;
      this.level = students.level;
      this.isBourseUsed = students.isBourseUsed;
      this.birthday = students.birthday || '';
      this.nationality = students.nationality || '';
      this.address = students.address || '';
      this.phone = students.phone || '';
      this.email = students.email || '';
      this.gender = students.gender || '';
      this.matricule = students.matricule || '';
      this.classe = students.classe ;
      this.role_id = students.role_id ;
      this.idSchool = students.idSchool ;
      this.idSection = students.idSection ;
      this.created_by = students.created_by ;
      this.updated_by = students.updated_by ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
