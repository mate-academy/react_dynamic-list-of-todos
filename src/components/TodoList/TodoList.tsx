import React from 'react';

import { TodoInfo } from '../TodoInfo';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  appliedQuery: string,
  onSelectUser: (id: number) => void,
  onSelectTodo: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  appliedQuery,
  onSelectUser,
  onSelectTodo,
}) => {
  const handleClick = (userId: number, todo: Todo) => {
    onSelectUser(userId);
    onSelectTodo(todo);
  };

  const filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase().includes(appliedQuery.toLowerCase())
  ));

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
        {filteredTodos.map(todo => (
          <TodoInfo
            todo={todo}
            selectedTodo={selectedTodo}
            onClick={handleClick}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};
