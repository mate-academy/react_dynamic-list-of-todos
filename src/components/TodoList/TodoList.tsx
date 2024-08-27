import React from 'react';
import { Todo } from '../../types/Todo';
import { SelectedTodo } from '../../types/SelectedTodo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  selectedTodo: SelectedTodo;
  setSelectedTodo: (todo: SelectedTodo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
}: Props) => (
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
        <TodoInfo
          key={todo.id}
          todo={todo}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      ))}
    </tbody>
  </table>
);
