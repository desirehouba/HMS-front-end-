
export class CategoryEvaluations {
  id: number;
  name: string;
  code: string;
  matterevaluations: any;
  idSchool : string;
  idSection: string;
  constructor(categoryEvaluations: CategoryEvaluations) {
    {
      this.id = categoryEvaluations.id || this.getRandomID();
      this.name = categoryEvaluations.name || '';
      this.code = categoryEvaluations.code;
      this.idSection = categoryEvaluations.idSection || '';
      this.idSchool = categoryEvaluations.idSchool ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
