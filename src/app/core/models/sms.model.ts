
export class Sms {
  id: number;
  message: string;
  created_at: string;
  author: any;


  constructor(sms: Sms) {
    {
      this.id = sms.id || this.getRandomID();
      this.message = sms.message || "";
      this.created_at = sms.created_at || "";
      this.author = sms.author || "";
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
