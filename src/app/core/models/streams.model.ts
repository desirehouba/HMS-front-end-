
export class Streams {
  id: number;
  name: string;
  campus: number;
  description: number;
  idSchool : string;
  idSection: string;
  cycles: any[];
  cyclesnames : any[];
  section: any;
  constructor(streams: Streams) {
    {
      this.id = streams.id || this.getRandomID();
      this.campus = streams.campus;
      this.cycles = streams.cycles;
      this.cyclesnames = streams.cyclesnames;
      this.section = streams.section;
      this.idSection = streams.idSection || '';
      this.description = streams.description ;
      this.name = streams.name || '';
      this.idSchool = streams.idSchool ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
