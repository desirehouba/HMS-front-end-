

export class Exams {
  id: number;
  value: string;
  observation : string;
  duration : string;
  idCoeficient : number;
  student : any;
  matter : any;
  teacher: any;
  idTeacher : number;
  classe: any;
  assessment : any; 
  idAssessment: number;
  coeficient : any;
  typeEvaluation : any;
  restaurant : any;
  idSection: number;
  idSchool: number;
  
  constructor(ratings: Exams) {
    {
      this.id = ratings.id || this.getRandomID();
      this.value = ratings.value || '';
      this.observation = ratings.observation ;
      this.duration = ratings.duration ;
      this.idCoeficient = ratings.idCoeficient ;
      this.student = ratings.student ;
      this.assessment = ratings.assessment ;
      this.coeficient = ratings.coeficient ;
      this.matter = ratings.matter ;
      this.idTeacher = ratings.idTeacher ;
      this.teacher = ratings.teacher || '';
      this.classe = ratings.classe || '';
      this.classe = ratings.classe || '';
      this.restaurant = ratings.restaurant ;
      this.idAssessment = ratings.idAssessment ;
      this.idSchool = ratings.idSchool ;
      this.idSection = ratings.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
