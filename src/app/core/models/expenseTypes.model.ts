
export class ExpenseTypes {
  id: number;
  name: string;
  description : string; 
  
  constructor(expenseTypes: ExpenseTypes) {
    {
      this.id = expenseTypes.id || this.getRandomID();
      this.name = expenseTypes.name ; 
      this.description = expenseTypes.description ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
