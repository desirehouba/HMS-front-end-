
export class Holidays {
  id: number;
  name: string;
  reason : string;
  start_date: string;
  status: string;
  user: any;
  type: any;
  userApprove: any;
  days_taken: any;
  end_date: any;
  constructor(conges: Holidays) {
    {
      this.id = conges.id || this.getRandomID();
      this.name = conges.name ;
      this.status = conges.status ;
      this.start_date = conges.start_date || '';
      this.reason = conges.reason || '';
      this.user = conges.user ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
