
export class Questionnaires {
  id: number;
  assessment: any;
  restaurant: any;
  intitule: any;
  reponse: any;
  notemax: any;
  
  constructor(assessments: Questionnaires) {
    {
      this.id = assessments.id || this.getRandomID();
      this.assessment = assessments.assessment ;
      this.restaurant = assessments.restaurant;
      this.intitule = assessments.intitule;
      this.reponse = assessments.reponse;
      this.notemax = assessments.notemax;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
