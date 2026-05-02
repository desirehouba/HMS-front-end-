
export class CategoriesRooms {
  id: number;
  name: string;
  description: string;
  created_at: any;
  author : any;
  count_rooms: any;
  constructor(categoriesRooms: CategoriesRooms) {
    {
      this.id = categoriesRooms.id || this.getRandomID();
      this.name = categoriesRooms.name || '';
      this.description = categoriesRooms.description;
      this.count_rooms = categoriesRooms.count_rooms || '';
      this.author = categoriesRooms.author ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
