
export class Responses {
  id: number;
  assessment: any;
  assessment_type: any;
  user: any;
  response: any;
  question: any;
  note:any;
  
  constructor(reponses: Responses) {
    {
      this.id = reponses.id || this.getRandomID();
      this.assessment = reponses.assessment ;
      this.assessment_type = reponses.assessment_type;
      this.user = reponses.user;
      this.response = reponses.response;
      this.question = reponses.question;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
