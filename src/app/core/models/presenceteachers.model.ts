

export class Presenceteachers {
  id: number;
  hour: string;
  date: string;
  course: any;
  classe: any;
  departureTime : string;
  arrivalTime: string;
  teacher: any;
  scanPerCourse: boolean;
  savingType: string;
  raison: string;
  total_hours_global: any;
  total_hours_individual: any;
  idSchool : number;
  idSection : number;
  created_by:number;
  updated_by:number;
  constructor(presenceteachers: Presenceteachers) {
    {
      this.id = presenceteachers.id || this.getRandomID();
      this.departureTime = presenceteachers.departureTime || '';
      this.date = presenceteachers.date || '';
      this.arrivalTime = presenceteachers.arrivalTime || '';
      this.hour = presenceteachers.hour || '';
      this.raison = presenceteachers.raison;
      this.classe = presenceteachers.classe;
      this.scanPerCourse = presenceteachers.scanPerCourse ;
      this.savingType = presenceteachers.savingType ;
      this.course = presenceteachers.course;
      this.teacher = presenceteachers.teacher ;
      this.idSchool = presenceteachers.idSchool ;
      this.idSection = presenceteachers.idSection ;
      this.created_by = presenceteachers.created_by ;
      this.updated_by = presenceteachers.updated_by ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
