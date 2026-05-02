
export class RoomServices {
  id: number;
  name: string;
  description: string;
  created_at: any;
  service:any
  price:any
  author : any;
  count_rooms: any;
  constructor(roomServices: RoomServices) {
    {
      this.id = roomServices.id || this.getRandomID();
      this.name = roomServices.name || '';
      this.description = roomServices.description;
      this.count_rooms = roomServices.count_rooms || '';
      this.author = roomServices.author ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
