// types/types.ts

export interface User {
    id_User: number;
    full_name: string;
    image?: string;
    role: string;
    status?: string;
    default_Adress_lat?: number;
    default_Adress_lng?: number;
    default_time?: string;
    booking: Booking[];
    key?: Key;
    key_id?: number;
  }
  
  export interface Booking {
    id_Booking: number;
    user_id: number;
    depart_Time: string;
    depart_Date: string;
    Adress_lnt?: number;
    Adress_lng?: number;
    bookedAt?: Date;
    bus_id: number;
    bookingStatus?: string;
  }
  
  export interface Key {
    id_Key: number;
    userName: string;
    email: string;
  }
  