
export class SalaryAdvances {
  id: number;
  user: any;
  status: string;
  amount: number;
  payment_deadline : string;
  reason: string;
  description: any;
  userApprove: any;
  libelle: string;
  approval_date: Date;
  created_at : string;
  constructor(salaryAdvances: SalaryAdvances) {
    {
      this.id = salaryAdvances.id || this.getRandomID();
      this.amount = salaryAdvances.amount;
      this.payment_deadline = salaryAdvances.payment_deadline;
      this.description = salaryAdvances.description ;
      this.approval_date = salaryAdvances.approval_date;
      this.user = salaryAdvances.user;
      this.libelle = salaryAdvances.libelle;
      this.reason = salaryAdvances.reason ;
      this.status = salaryAdvances.status || '';
      this.created_at = salaryAdvances.created_at ;
    }
  }
  
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
