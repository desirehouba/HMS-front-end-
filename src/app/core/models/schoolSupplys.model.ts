


export class SchoolSupplys {
  id: number;
  supply : string;
  level: any;
  idOptionLevel: number;
  idSection: number;
  idSchool: number;
  
  constructor(schoolSupplys: SchoolSupplys) {
    {
      this.id = schoolSupplys.id || this.getRandomID();
      this.supply = schoolSupplys.supply || '';
      this.level = schoolSupplys.level || '';
      this.idOptionLevel = schoolSupplys.idOptionLevel ;
      this.idSchool = schoolSupplys.idSchool ;
      this.idSection = schoolSupplys.idSection ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
