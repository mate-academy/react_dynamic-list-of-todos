import {
  User, SortButtons,
} from '../interfaces';

const noAddress = {
  id: 0,
  userId: 0,
  street: '',
  suite: '',
  city: '',
  zipcode: '',
  createdAt: '',
  updatedAt: '',
};

export const noUser: User = {
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  createdAt: '',
  updatedAt: '',
  address: noAddress,
};

export const buttons: SortButtons[] = [
  {
    id: 1,
    title: 'Sort by title',
    callback: (todos) => {
      todos.sort((a, b) => a.todo.title.localeCompare(b.todo.title));

      return todos;
    },
  },
  {
    id: 2,
    title: 'Sort by completed',
    callback: (todos) => {
      todos.sort((a, b) => Number(a.todo.completed) - Number(b.todo.completed));

      return todos;
    },
  },
  {
    id: 3,
    title: 'Sort by name',
    callback: (todos) => {
      todos.sort((a, b) => a.user.name.localeCompare(b.user.name));

      return todos;
    },
  },
];
