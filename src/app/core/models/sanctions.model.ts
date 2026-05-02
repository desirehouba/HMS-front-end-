import { Students } from "./students.model";

export class Sanctions {
  id: number;
  type: string;
  reasons : string;
  description: string;
  student: Students;
  idSection: number;
  idSchool: number;
  
  constructor(sanctions: Sanctions) {
    {
      this.id = sanctions.id || this.getRandomID();
      this.type = sanctions.type ;
      this.reasons = sanctions.reasons ;
      this.description = sanctions.description || '';
      this.student = sanctions.student || '';
      this.idSchool = sanctions.idSchool ;
      this.idSection = sanctions.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
