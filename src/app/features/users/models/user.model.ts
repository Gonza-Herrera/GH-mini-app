export interface Company {
  name: string;
}

export interface Address {
  city: string;
  zipcode: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
  address: Address;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
