
export class Rooms {
  id: number;
  image: any;
  status: string;
  number: number;
  price : number;
  description: string;
  name: any;
  room_category: any;
  room_type: any;
  floor: number;
  capacity: number;
  author: number;
  hotel_id: any;
  created_at : string;
  constructor(rooms: Rooms) {
    {
      this.id = rooms.id || this.getRandomID();
      this.number = rooms.number;
      this.price = rooms.price;
      this.floor = rooms.floor ;
      this.author = rooms.author;
      this.name = rooms.name ;
      this.room_type = rooms.room_type;
      this.capacity = rooms.capacity;
      this.number = rooms.number;
      this.room_category = rooms.room_category;
      this.description = rooms.description ;
      this.status = rooms.status || '';
      this.created_at = rooms.created_at ;
    }
  }
  
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
