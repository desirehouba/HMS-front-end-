
export class SalaryDeductions {
  id: number;
  user: any;
  status: string;
  amount: number;
  payment_deadline : string;
  reason: string;
  description: any;
  userApprove: any;
  libelle: string;
  date: Date;
  created_at : string;
  constructor(noteFrais: SalaryDeductions) {
    {
      this.id = noteFrais.id || this.getRandomID();
      this.amount = noteFrais.amount;
      this.payment_deadline = noteFrais.payment_deadline;
      this.description = noteFrais.description ;
      this.date = noteFrais.date;
      this.user = noteFrais.user;
      this.libelle = noteFrais.libelle;
      this.reason = noteFrais.reason ;
      this.status = noteFrais.status || '';
      this.created_at = noteFrais.created_at ;
    }
  }
  
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
