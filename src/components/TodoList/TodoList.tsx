import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoCard } from '../Todo/TodoCard';

type Props = {
  filteredTodos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
  setIsModalActive: (isModalActive: boolean) => void;
  isModalActive: boolean;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  selectedTodo,
  setSelectedTodo,
  setIsModalActive,
  isModalActive,
}) => {
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
        {filteredTodos.map(todo => {
          return (
            <TodoCard
              key={todo.id}
              todo={todo}
              selectedTodo={selectedTodo}
              setSelectedTodo={setSelectedTodo}
              setIsModalActive={setIsModalActive}
              isModalActive={isModalActive}
            />
          );
        })}
      </tbody>
    </table>
  );
};
