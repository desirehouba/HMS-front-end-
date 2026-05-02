

export class Departements {
  id: number;
  name: string;
  lang: string;
  description: string;
  responsible: any;
  manager: any;
  hotel: any;
  constructor(sections: Departements) {
    {
      this.id = sections.id || this.getRandomID();
      this.manager = sections.manager || '';
      this.description = sections.description || '';
      this.name = sections.name || '';
      this.lang = sections.lang || '';
      this.hotel = sections.hotel;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
