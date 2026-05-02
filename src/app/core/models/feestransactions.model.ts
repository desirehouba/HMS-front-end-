import { Students } from "./students.model";

export class Fees {
  id: number;
  payment_date : string;
  payment_mode: string;
  advancePayment : number ;
  fee : any;
  student : Students;
  idSection: number;
  idSchool: number;
  created_at : string;
  constructor(fees: Fees) {
    {
      this.id = fees.id || this.getRandomID();
      this.student = fees.student;
      this.fee = fees.fee;
      this.advancePayment = fees.advancePayment ;
      this.payment_date = fees.payment_date || '';
      this.idSection = fees.idSection || 1;
      this.idSchool = fees.idSchool || 1;
      this.payment_mode = fees.payment_mode || '';
      this.created_at = fees.created_at || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
