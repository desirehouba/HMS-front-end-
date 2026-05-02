import { Role } from './role';

export class User {/* 
  data: any; */
  id!: number;
  photo!: string;
  username!: string;
  password!: string;
  firstName!: string;
  name!: string;
  role!: Role;
  role_description!: string;
  token!: string;
  idSchool!: number;
  idSection!: number;
  idStudent!: any;
  classes! : any[];
  idClasse!: any;
  idLevel!: number;
  role_type! : string;
  sectionName! : string;
  schoolName! : string;
  service_id! : number;
  scholar_level! : string;
  permissions!: any[];
  hotel_id!:number;
  idService!:number;
  hotelName!: string;
  registrationPaid!: any;
  section!:any
  school:any 
  typeRole:any
}

export class Token {
  data!: User; 
  token!: string;
}