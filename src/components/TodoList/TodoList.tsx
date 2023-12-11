import React, { useContext } from 'react';
import { TodoElement } from './TodoElement';
import { TodoContext } from '../TodoContext';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const {
    todos, query, selectedSelect, loader,
  } = useContext(TodoContext);

  const filteredTodos = () => {
    const allTodos = todos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
    const completed = allTodos.filter(todo => todo.completed === true);
    const active = allTodos.filter(todo => !todo.completed);

    if (selectedSelect === 'active') {
      return active;
    }

    if (selectedSelect === 'completed') {
      return completed;
    }

    return allTodos;
  };

  return (
    loader ? <Loader />
      : (
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
            {filteredTodos().map(todo => (
              <TodoElement
                todo={todo}
                key={todo.id}
              />
            ))}
          </tbody>
        </table>
      )
  );
};
