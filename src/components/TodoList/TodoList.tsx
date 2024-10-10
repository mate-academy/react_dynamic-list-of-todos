import { FC } from 'react';

import { Todo } from '../../types/Todo';

import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: FC<Props> = ({ todos, selectedTodo, onSelectTodo }) => (
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
          key={todo.id}
          todo={todo}
          selectedTodo={selectedTodo}
          onSelectTodo={onSelectTodo}
        />
      ))}
    </tbody>
  </table>
);
