/// <reference types="react-scripts" />
export interface Todo {
  'id': number,
  'userId': number,
  'completed': boolean,
  'title': string,
  'createdAt': string,
  'updatedAt': string,
}

export interface User {
  'id': number,
  'name': string,
  'username': string,
  'email': string,
  'phone': string,
  'website': string,
  'createdAt': string,
  'updatedAt': string,
  'address': string,
}
