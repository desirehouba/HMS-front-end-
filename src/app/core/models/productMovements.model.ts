

export class ProductMovements {
  id: number;
  stock : any;
  product:  any;
  deletedBy: any;
  createdBy: any;
  description : any;
  operationType:  any;
  updatedBy: any;
  quantity: any;
  
  constructor(orders: ProductMovements) {
    {
      this.id = orders.id || this.getRandomID();
      this.stock = orders.stock || '';
      this.product = orders.product || '';
      this.createdBy = orders.createdBy ;
      this.deletedBy = orders.deletedBy ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
