/// <reference types="react-scripts" />

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    }
  }
};
