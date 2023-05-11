import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/Todo';
import { TodoContext } from '../../contexts/TodoContext';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

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
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            selectedTodo={selectedTodo}
            onSelect={setSelectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
