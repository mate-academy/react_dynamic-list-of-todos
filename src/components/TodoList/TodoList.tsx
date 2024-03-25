import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
  setIsTodoModalShown: (condition: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
  setIsTodoModalShown,
}) => (
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
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          setIsTodoModalShown={setIsTodoModalShown}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);
