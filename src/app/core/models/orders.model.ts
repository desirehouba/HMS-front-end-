

export class Orders {
  id: number;
  products : any;
  room:  any;
  
  room_service : any
  delivery_date : any
  status : string;
  created_at : any
  price : any;
  customer: any;
  payment_mode: any;
  payment_status : any; 
  is_free : boolean;
  amount_paid: any;
  
  constructor(orders: Orders) {
    {
      this.id = orders.id || this.getRandomID();
      this.products = orders.products || '';
      this.room = orders.room || '';
      this.status = orders.status || '';
      this.room_service = orders.room_service ;
      this.payment_mode = orders.payment_mode ;
      this.payment_status = orders.payment_status ;
      this.customer = orders.customer ;
      this.is_free = orders.is_free || false;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
