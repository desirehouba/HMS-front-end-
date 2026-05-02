 

export class Summaries {
  id: number;
  name: string;
  date : string;
  answer : string;
  description : string;
  lesson : any;
  teacher: any;
  classe: any;
  created_at: number;
  idSchool: number;
  
  constructor(summaries: Summaries) {
    {
      this.id = summaries.id || this.getRandomID();
      this.name = summaries.name || '';
      this.date = summaries.date ;
      this.answer = summaries.answer ;
      this.description = summaries.description ;
      this.lesson = summaries.lesson ;
      this.teacher = summaries.teacher || '';
      this.classe = summaries.classe || '';
      this.idSchool = summaries.idSchool ;
      this.created_at = summaries.created_at ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
