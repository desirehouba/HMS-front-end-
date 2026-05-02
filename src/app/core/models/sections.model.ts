

export class Sections {
  id: number;
  name: string;
  lang: string;
  description: string;
  principal: any;
  school: any;
  constructor(sections: Sections) {
    {
      this.id = sections.id || this.getRandomID();
      this.principal = sections.principal || '';
      this.description = sections.description || '';
      this.name = sections.name || '';
      this.lang = sections.lang || '';
      this.school = sections.school;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
