
export class Transferts {
  id: number;
  reason: string;
  idStudent : string;
  route: string;
  country: string;
  status: string;
  academic_year: any;
  idSection: number;
  idSchool: number;
  
  constructor(projets: Transferts) {
    {
      this.id = projets.id || this.getRandomID();
      this.reason = projets.reason ;
      this.idStudent = projets.idStudent ;
      this.country = projets.country || '';
      this.route = projets.route || '';
      this.status = projets.status || '';
      this.academic_year = projets.academic_year ;
      this.idSchool = projets.idSchool ;
      this.idSection = projets.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
