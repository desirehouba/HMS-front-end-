
export class Vouchers {
  id: number;
  name: string;
  description : string;
  total_amount: number;
  priority: number;
  status: string;
  validation_date: any;
  articles : any[];
  responsible:any
  responsible_id: any;
  service_id: number;
  supplier: any;
  quotation_file: any
  order_received_date : any


  
  constructor(vouchers: Vouchers) {
    {
      this.id = vouchers.id || this.getRandomID();
      this.name = vouchers.name ;
      this.status = vouchers.status ;
      this.total_amount = vouchers.total_amount ;
      this.priority = vouchers.priority;
      this.articles = [],
      this.description = vouchers.description ;
      this.service_id = vouchers.service_id ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
