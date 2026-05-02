
export class Articles {
  id: number;
  name: string;
  description : string;
  price: number;
  type: any;
  alert_quantity: any;
  service: any;
  suppliers: any;
  created_at: any;
  container_quantity: any;
  container_stock: any;
  container_unit: any;
  container: any;
  expiry_date: any;
  unit_of_measurement: any;
  quantity: any;
  image: any; 
  
  constructor(articles: Articles) {
    {
      this.id = articles.id || this.getRandomID();
      this.name = articles.name ;
      this.price = articles.price ;
      this.description = articles.description ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
