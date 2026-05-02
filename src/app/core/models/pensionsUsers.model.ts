
import { Invoices } from "./invoices.model";
import { Students } from "./students.model";

export class PensionUsers {
  id: number;
  type: string;
  invoice: Invoices;
  payment_date : string;
  payment_mode: string;
  student: Students;
  advancePayment: number;
  balancePayment: number;
  idSection: number;
  idSchool: number;
  created_at : string;
  constructor(transactions: PensionUsers) {
    {
      this.id = transactions.id || this.getRandomID();
      this.type = transactions.type || '';
      this.invoice = transactions.invoice || '';
      this.payment_date = transactions.payment_date || '';
      this.advancePayment = transactions.advancePayment ;
      this.balancePayment = transactions.balancePayment;
      this.idSection = transactions.idSection ;
      this.idSchool = transactions.idSchool;
      this.student = transactions.student;
      this.payment_mode = transactions.payment_mode || '';
      this.created_at = transactions.created_at || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
