
export class Warnings {
  id: number;
  name: string;
  reason : string;
  date: any;
  statut: string;
  dateRetour: string;
  user: any;
  duration: any;
  estimation: any;
  creator: any;
  observation: any;
  idSection: number;
  idSchool: number;
  
  constructor(warnings: Warnings) {
    {
      this.id = warnings.id || this.getRandomID();
      this.name = warnings.name ;
      this.reason = warnings.reason ;
      this.dateRetour = warnings.dateRetour ;
      this.date = warnings.date || '';
      this.statut = warnings.statut || '';
      this.user = warnings.user ;
      this.idSchool = warnings.idSchool ;
      this.idSection = warnings.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
