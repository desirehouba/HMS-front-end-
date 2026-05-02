

export class Assessments {
  id: number;
  hour: string;
  day : string;
  duration : string;
  date : string;
  matter : any;
  teacher: any;
  classe: any;
  typeevaluations: number[];
  notemax: number;
  restaurants: number[];
  typeevaluationsName: any[];
  typeevaluationsValues: any[];
  typeevaluationsLibelle: any[];
  coefficient: any;
  is_qcm: Boolean;
  idSection: number;
  idSchool: number;
  attitude: number;
  ecrit: number;
  oral: number;
  pratical: number;
  savoir_etre: number;
  written: number;
  
  constructor(assessments: Assessments) {
    {
      this.id = assessments.id || this.getRandomID();
      this.hour = assessments.hour || '';
      this.day = assessments.day ;
      this.duration = assessments.duration ;
      this.date = assessments.date ;
      this.typeevaluations = assessments.typeevaluations ;
      this.notemax = assessments.notemax ;
      this.restaurants = assessments.restaurants ;
      this.matter = assessments.matter ;
      this.attitude = assessments.attitude ;
      this.ecrit = assessments.ecrit ;
      this.oral = assessments.oral;
      this.is_qcm = assessments.is_qcm;
      this.typeevaluationsLibelle = assessments.typeevaluationsLibelle;
      this.typeevaluationsValues = assessments.typeevaluationsValues;
      this.typeevaluationsName = assessments.typeevaluationsName;
      this.pratical = assessments.pratical ;
      this.savoir_etre = assessments.savoir_etre ;
      this.written = assessments.written ;
      this.teacher = assessments.teacher || '';
      this.coefficient = assessments.coefficient ;
      this.classe = assessments.classe || '';
      this.idSchool = assessments.idSchool ;
      this.idSection = assessments.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
