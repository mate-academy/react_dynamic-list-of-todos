import React from 'react';
import './TodoList.scss';
import { Todo } from '../Todo';

type Props = {
  todos: Todo[];
  currentQuery: string;
  changeUser: (userId: number) => void;
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  currentQuery,
  changeUser,
  selectedUserId,
}) => {
  const visibleTodos = todos.filter((todo) => {
    const { title } = todo;

    return title.includes(currentQuery);
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {visibleTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              changeUser={changeUser}
              selectedUserId={selectedUserId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
