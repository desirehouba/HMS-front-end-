
export class TypeRequetes {
  id: number;
  name: string;
  idSchool: number;
  constructor(typeRequetes: TypeRequetes) {
    {
      this.id = typeRequetes.id || this.getRandomID();
      this.name = typeRequetes.name; 
      this.idSchool = typeRequetes.idSchool;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
