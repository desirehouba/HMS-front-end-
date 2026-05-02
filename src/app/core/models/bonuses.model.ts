
export class Bonuses {
  id: number;
  user: any;
  userApprove: any;
  amount: number;
  reason: string;
  status: any;
  idSection: number;
  idSchool: number;
  
  constructor(tranches: Bonuses) {
    {
      this.id = tranches.id || this.getRandomID();
      this.reason = tranches.reason || '' ;
      this.amount = tranches.amount ;
      this.idSchool = tranches.idSchool ;
      this.idSection = tranches.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
