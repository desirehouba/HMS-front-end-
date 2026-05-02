
export class Feedbacks {
  id: number;
  name: string;
  message: string;
  created_at: any;
  author : any;
  service: any
  count_rooms: any;
  constructor(feedbacks: Feedbacks) {
    {
      this.id = feedbacks.id || this.getRandomID();
      this.name = feedbacks.name || '';
      this.message = feedbacks.message;
      this.count_rooms = feedbacks.count_rooms || '';
      this.author = feedbacks.author ;
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
