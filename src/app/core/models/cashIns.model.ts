

export class CashIns {
  id: number;
  date : any;
  amount:  any;
  status : string; 
  order: any;
  booking : any;
  service :any
  created_at : any
  payment_method: any;
  seller :any
  created_by : any
  amount_remaining:any
  
  constructor(cashIns: CashIns) {
    {
      this.id = cashIns.id || this.getRandomID();
      this.date = cashIns.date || '';
      this.amount = cashIns.amount || '';
      this.status = cashIns.status || '';
      this.payment_method = cashIns.payment_method ;
      this.order = cashIns.order ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
