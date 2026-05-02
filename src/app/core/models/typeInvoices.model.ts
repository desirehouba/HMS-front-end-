
export class TypeInvoices {
  id: number;
  name: string;
  idSchool: number;
  constructor(typeInvoices: TypeInvoices) {
    {
      this.id = typeInvoices.id || this.getRandomID();
      this.name = typeInvoices.name; 
      this.idSchool = typeInvoices.idSchool;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
