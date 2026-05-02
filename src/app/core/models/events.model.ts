
export class Events {
  id: number;
  name: string;
  description : string;
  start_date: string;
  end_date: string;
  type: string;  
  budget: number;
  hotel_id: any;
  service_id: any;
  
  constructor(events: Events) {
    {
      this.id = events.id || this.getRandomID();
      this.name = events.name ;
      this.description = events.description ;
      this.type = events.type ;
      this.start_date = events.start_date || '';
      this.end_date = events.end_date || ''; 
      this.budget = events.budget ; 
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
