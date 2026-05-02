
export class Bookings {
  id: number;
  image: any;
  price : any
  status: string;
  vehicle_number:any
  arrival_time:any
  departure_time:any
  transport_mode:any
  arrivals:any
  amount_paid : any;
  duration: any
  start_date: string;
  booking_rooms: any[];
  booking_room_ids: any;
  end_date : string;
  description: string;
  payment_status : any;
  user: any;
  reduction_amount: any;
  is_free : boolean;
  constructor(bookings: Bookings) {
    {
      this.id = bookings.id || this.getRandomID();
      this.start_date = bookings.start_date;
      this.end_date = bookings.end_date;
      this.description = bookings.description ;
      this.status = bookings.status || '';
      this.is_free = bookings.is_free || false;
      this.booking_rooms = []
    }
  }
  
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
} 