import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../Context/TodoContext';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const { todos, text, filter } = useContext(TodosContext);

  const filterTodos = () => {
    const cortedTodos = () => {
      switch (filter) {
        case Status.ACTIVE:
          return todos.filter((todo) => !todo.completed);
        case Status.COMPLETED:
          return todos.filter((todo) => todo.completed);
        case Status.ALL:
        default:
          return todos;
      }
    };

    return text.trim() ? cortedTodos().filter((todo) => {
      return todo.title.toLowerCase().includes(text.toLowerCase());
    }) : cortedTodos();
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {filterTodos().map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};
