
export class Contracts {
  id: number;
  reference: string;
  type : string;
  description: string;
  start_date: string;
  status: string;
  workingHours: any;
  user: any;
  position: any;
  gross_salary: any;
  working_hours: any;
  service_benefits: any;
  bonus: any;
  file_link: any;
  duration: any;
  idSchool: number;
  
  constructor(contracts: Contracts) {
    {
      this.id = contracts.id || this.getRandomID();
      this.reference = contracts.reference ;
      this.type = contracts.type ;
      this.workingHours = contracts.workingHours ;
      this.description = contracts.description || '';
      this.start_date = contracts.start_date || '';
      this.status = contracts.status || '';
      this.user = contracts.user ;
      this.idSchool = contracts.idSchool ;
      this.duration = contracts.duration ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
