import React, { FC, useState } from 'react';
import { TodoWithUser } from '../../constants/types';
import { TodoItem } from '../TodoItem/TodoItem';
import { SORT_FILTERS } from '../../constants/api';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  const [sortedTodos, setSortedTodos] = useState<TodoWithUser[]>([...todos]);

  const sortBy = (param: string) => {
    switch (param) {
      case SORT_FILTERS.id:
        setSortedTodos([...sortedTodos]
          .sort((a, b) => a.id - b.id));
        break;
      case SORT_FILTERS.completed:
        setSortedTodos([...sortedTodos]
          .sort((a, b) => Number(a.completed) - Number(b.completed)));
        break;
      case SORT_FILTERS.name:
        setSortedTodos([...sortedTodos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case SORT_FILTERS.title:
        setSortedTodos([...sortedTodos]
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      default:
        break;
    }
  };

  return (
    <table className="table is-hoverable">
      <thead className="thead">
        <tr className="tr">
          <th className="th" onClick={() => sortBy('id')}>id</th>
          <th className="th" onClick={() => sortBy('title')}>title</th>
          <th className="th" onClick={() => sortBy('completed')}>completed</th>
          <th className="th" onClick={() => sortBy('name')}>user</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {sortedTodos.map((todo: TodoWithUser) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </tbody>
    </table>
  );
};
