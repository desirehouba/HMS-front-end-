


export class Fees {
  id: number;
  name: string;
  deadline : string;
  price : number;
  level: any;
  levels: number[];
  levels_name: string[];
  idOptionLevel: number;
  idSection: number;
  idSchool: number;
  
  constructor(fees: Fees) {
    {
      this.id = fees.id || this.getRandomID();
      this.name = fees.name || '';
      this.deadline = fees.deadline || '';
      this.price = fees.price ;
      this.levels = fees.levels;
      this.levels_name = fees.levels_name;
      this.level = fees.level || '';
      this.idOptionLevel = fees.idOptionLevel;
      this.idSchool = fees.idSchool ;
      this.idSection = fees.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
