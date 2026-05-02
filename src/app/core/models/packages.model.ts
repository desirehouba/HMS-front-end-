


export class Packages {
  id: number;
  name: string;
  price: number;
  level: any;
  duration: string;
  dateSubscrition: Date;
  status : string;
  description : string;
  website : boolean;
  mail_pro: boolean;
  created_by : number;
  updated_by : number;
  constructor(packages: Packages) {
    {
      this.id = packages.id || this.getRandomID();
      this.name = packages.name || '';
      this.price = packages.price;
      this.level = packages.level || '';
      this.duration = packages.duration;
      this.dateSubscrition = packages.dateSubscrition || '';
      this.status = packages.status || '';
      this.description = packages.description || '';
      this.website = packages.website || false;
      this.mail_pro = packages.mail_pro || false;
      this.created_by = packages.created_by;
      this.updated_by = packages.updated_by;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
