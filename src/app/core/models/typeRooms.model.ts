
export class TypeRooms {
  id: number;
  name: string;
  description: string;
  created_at: any;
  author : any;
  hotel_id : any
  hotel : any
  count_rooms: any;
  constructor(typeRooms: TypeRooms) {
    {
      this.id = typeRooms.id || this.getRandomID();
      this.name = typeRooms.name || '';
      this.description = typeRooms.description;
      this.count_rooms = typeRooms.count_rooms || '';
      this.author = typeRooms.author ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
