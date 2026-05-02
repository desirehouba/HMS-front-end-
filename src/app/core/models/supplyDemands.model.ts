

export class SupplyDemands {
  id: number;
  articles : any;
  name:  any;
  room_service : any
  validation_date : any
  status : string;
  created_at : any
  priority : any;
  creator: any;
  responsible: any;
  description: any;
  
  constructor(supplyDemands: SupplyDemands) {
    {
      this.id = supplyDemands.id || this.getRandomID();
      this.articles = supplyDemands.articles || ''; 
      this.status = supplyDemands.status || '';
      this.room_service = supplyDemands.room_service ;
      this.description = supplyDemands.description ;
      this.responsible = supplyDemands.responsible ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
