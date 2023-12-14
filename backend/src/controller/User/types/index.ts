export interface Users {
  _id: any;
  id: any;
  name: string;
  email: string;
  password: string;
  phone: number;
  zipcode: string;
  profilePic: string;
  lat: number;
  long: number;
  location?: {
    type: string;
    coordinates: [number];
  };
}

export interface Usersss {
  name: string;
  email: string;
  password: string;
  phone: number;
  zipcode: string;
  profilePic: string;
  lat: number;
  long: number;
  location?: {
    type: string;
    coordinates: [number];
  };
}
