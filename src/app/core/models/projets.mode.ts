
export class Projets {
  id: number;
  name: string;
  description : string;
  start_date: string;
  end_date: string;
  status: string;
  priority: string;
  user: any;
  idSection: number;
  idSchool: number;
  
  constructor(projets: Projets) {
    {
      this.id = projets.id || this.getRandomID();
      this.name = projets.name ;
      this.description = projets.description ;
      this.priority = projets.priority ;
      this.end_date = projets.end_date || '';
      this.start_date = projets.start_date || '';
      this.status = projets.status || '';
      this.user = projets.user ;
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
