

export class Disbursements {
  id: number;
  date : any;
  total_amount:  any;
  status : string; 
  purchase_order: any;
  service :any
  created_at : any
  payment_method: any;
  updated_at: any;
  validation_date :any
  responsible:any
  expense_type_id:any
  reference :any
  creator:any
  invoice_image :any
  reasons:any
  disbursement_date :any 
  
  constructor(disbursements: Disbursements) {
    {
      this.id = disbursements.id || this.getRandomID();
      this.date = disbursements.date || '';
      this.total_amount = disbursements.total_amount || '';
      this.status = disbursements.status || '';
      this.payment_method = disbursements.payment_method ;
      this.purchase_order = disbursements.purchase_order ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
