import React from 'react';
import { TodoType } from '../../types/TodoType';
import { Todo } from '../Todo/Todo';

type Props = {
  todos: TodoType[],
  selectedTodo: TodoType | null,
  setSelectedTodo: (todo: TodoType) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
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
        <Todo
          key={todo.id}
          todo={todo}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      ))}
    </tbody>
  </table>
);
