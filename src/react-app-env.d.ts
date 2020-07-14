// eslint-disable-next-line
/// <reference types="react-scripts" />
interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface TodoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: UserType;
}
