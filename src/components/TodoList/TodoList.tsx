import React, { useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { UserItem } from '../UserItem/UserItem';
import { Todo } from '../../types';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([...todos]);

  const sortTodos = (name: string) => {
    switch (name) {
      case 'completement':
        setSortedTodos(prev => [...prev].sort((a, b) => {
          return Number(a.completed) - Number(b.completed);
        }));

        return;
      case 'title':
        setSortedTodos(prev => [...prev].sort((a, b) => {
          return a.title.localeCompare(b.title);
        }));

        return;
      default:
        setSortedTodos(prev => [...prev].sort((a, b) => {
          if (a.user && b.user) {
            return a.user.name.localeCompare(b.user.name);
          }

          return 0;
        }));
    }
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement;

    sortTodos(id);
  };

  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th>
            Completed
            <button
              id="completement"
              type="button"
              className="button"
              onClick={clickHandler}
            >
              &or;
            </button>
          </th>
          <th>
            Task
            <button
              id="title"
              type="button"
              className="button"
              onClick={clickHandler}
            >
              &or;
            </button>
          </th>
          <th>
            Owner
            <button
              id="name"
              type="button"
              className="button"
              onClick={clickHandler}
            >
              &or;
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTodos.map(item => (
          <tr className="table-active">
            <TodoItem key={item.title} todo={item} />
            <UserItem
              key={item.id}
              name={item.user ? item.user.name : 'No owner'}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
