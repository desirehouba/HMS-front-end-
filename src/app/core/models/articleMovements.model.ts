

export class ArticleMovements {
  id: number;
  stock : any;
  article:  any;
  deletedBy: any;
  createdBy: any;
  description : any;
  operationType:  any;
  product: any;
  container_quantity: any;
  updatedBy: any;
  quantity: any;
  
  constructor(orders: ArticleMovements) {
    {
      this.id = orders.id || this.getRandomID();
      this.stock = orders.stock || '';
      this.article = orders.article || '';
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
