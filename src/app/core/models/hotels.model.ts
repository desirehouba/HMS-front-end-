
import { Fondateurs } from "./fondateurs.model";

export class Hotels {
  id: number;
  name: string;
  email: string;
  phone: number;
  address : string;
  section: string
  manager: Fondateurs;
  website: string;
  scholar_level: string;
  logo : string;
  city: string;
  stars: string;
  assistant: any;
  constructor(hotels: Hotels) {
    {
      this.id = hotels.id || this.getRandomID();
      this.manager = hotels.manager || '';
      this.email = hotels.email || '';
      this.section = hotels.section || '';
      this.phone = hotels.phone ;
      this.name = hotels.name || '';
      this.stars = hotels.stars || '';
      this.address = hotels.address;
      this.assistant = hotels.assistant;
      this.city = hotels.city || '';
      this.logo = hotels.logo || '';
      this.website = hotels.website || '';
      this.scholar_level = hotels.scholar_level || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
