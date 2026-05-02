

export class PurchaseOrders {
  id: number;
  name: string;
  description : string;
  levels : any[];
  assessment : boolean;
  libelle : string;
  code:  string;
  idSection: number;
  idSchool: number;
  
  constructor(purchaseOrders: PurchaseOrders) {
    {
      this.id = purchaseOrders.id || this.getRandomID();
      this.name = purchaseOrders.name || '';
      this.description = purchaseOrders.description || '';
      this.levels = purchaseOrders.levels || '';
      this.assessment = purchaseOrders.assessment;
      this.libelle = purchaseOrders.libelle || '';
      this.code = purchaseOrders.code || '';
      this.idSchool = purchaseOrders.idSchool ;
      this.idSection = purchaseOrders.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
