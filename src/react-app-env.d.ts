/// <reference types="react-scripts" />

export type Todo = {
  id:number,
  createdAt:string,
  updatedAt:string,
  userId:number,
  title:string,
  completed:false,
};

export type User = {
  id:number,
  createdAt:string,
  updatedAt:string,
  name:string,
  username:string,
  email:string,
  phone:string,
  website:string
};
