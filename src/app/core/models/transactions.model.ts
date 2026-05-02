


export class Transactions {
  id: number;
  type: string;
  invoice: any;
  payment_date : string;
  payment_mode: string;
  fee: any;
  student: any;
  idSection: number;
  advancePayment: number;
  balancePayment: number;
  classe: any;
  bourse: any;
  tranche : any;
  idPension : number;
  school: any;
  created_at : string;
  constructor(transactions: Transactions) {
    {
      this.id = transactions.id || this.getRandomID();
      this.type = transactions.type || '';
      this.invoice = transactions.invoice || '';
      this.payment_date = transactions.payment_date || '';
      this.advancePayment = transactions.advancePayment ;
      this.balancePayment = transactions.balancePayment ;
      this.idPension = transactions.idPension;
      this.tranche = transactions.tranche;
      this.student = transactions.student;
      this.classe = transactions.classe;
      this.payment_mode = transactions.payment_mode || '';
      this.school = transactions.school;
      this.idSection = transactions.idSection ;
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
