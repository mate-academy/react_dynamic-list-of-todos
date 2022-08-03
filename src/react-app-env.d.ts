/// <reference types="react-scripts" />

type Todo = {
  id:number,
  createdAt:string,
  updatedAt:string,
  userId:number,
  title:string,
  completed:boolean,
}; /* TODO: DESCRIBE */

type User = {
  id: number | null,
  name: string,
  email: string,
  phone: string,
};
