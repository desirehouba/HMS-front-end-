
export class Permissions {
  id: number;
  name: string;
  raison : string;
  depart: string;
  statut: string;
  dateRetour: string;
  User: any;
  status: string;
  userApprove : any;
  duration: any;
  estimation: any;
  user: any;
  observation: any;
  idSection: number;
  idSchool: number;
  
  constructor(permissions: Permissions) {
    {
      this.id = permissions.id || this.getRandomID();
      this.name = permissions.name ;
      this.raison = permissions.raison ;
      this.dateRetour = permissions.dateRetour ;
      this.depart = permissions.depart || '';
      this.statut = permissions.statut || '';
      this.status = permissions.status || '';
      this.User = permissions.User ;
      this.idSchool = permissions.idSchool ;
      this.idSection = permissions.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
