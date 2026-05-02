
export class Invoices {
  id: number;
  image: any;
  statut: string;
  amount: number;
  payment_deadline : string;
  reasons: string;
  customer: any;
  typeUser: string;
  user: any;
  date: Date;
  typeInvoice: any;
  school : any;
  idSection: number;
  number: string;
  mode: string;
  idSchool: number;
  created_at : string;
  constructor(invoices: Invoices) {
    {
      this.id = invoices.id || this.getRandomID();
      this.amount = invoices.amount;
      this.payment_deadline = invoices.payment_deadline;
      this.idSection = invoices.idSection ;
      this.idSchool = invoices.idSchool;
      this.customer = invoices.customer ;
      this.date = invoices.date;
      this.user = invoices.user;
      this.mode = invoices.mode;
      this.number = invoices.number;
      this.typeUser = invoices.typeUser;
      this.typeInvoice = invoices.typeInvoice ;
      this.reasons = invoices.reasons ;
      this.statut = invoices.statut || '';
      this.school = invoices.school ;
      this.created_at = invoices.created_at ;
    }
  }
  
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
