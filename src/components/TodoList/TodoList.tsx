import { FC } from 'react';

import { Todo } from '../../types/Todo';

import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  onTodoClick: (todoId: number) => void;
};

export const TodoList: FC<Props> = ({ todos, selectedTodoId, onTodoClick }) => (
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
      {todos.map((todo) => {
        const { id } = todo;

        return (
          <TodoItem
            key={id}
            todo={todo}
            selectedTodoId={selectedTodoId}
            openModal={() => onTodoClick(id)}
          />
        );
      })}
    </tbody>
  </table>
);
