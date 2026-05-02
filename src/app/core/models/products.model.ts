
export class Products {
  id: number;
  name: string;
  image: any;
  description : string;
  price: number;
  quantity: number;
  status: string;
  articles: any;
  unit_of_measurement: any;
  manufacturing_cost: any;
  service_id: number; 
  service: any; 
  stock_quantity: any; 
  created_at: any; 
  type: any; 
  expiry_date: any;
  alert_quantity: any;   
  
  constructor(products: Products) {
    {
      this.id = products.id || this.getRandomID();
      this.name = products.name ;
      this.status = products.status ;
      this.price = products.price ;
      this.quantity = products.quantity;
      this.description = products.description ;
      this.service_id = products.service_id ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
