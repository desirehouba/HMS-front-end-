
export class Restaurants {
  id: number;
  name: string;
  idSchool : number;
  idSection: number;
  constructor(restaurants: Restaurants) {
    {
      this.id = restaurants.id || this.getRandomID();
      this.name = restaurants.name || '';
      this.idSection = restaurants.idSection;
      this.idSchool = restaurants.idSchool ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
