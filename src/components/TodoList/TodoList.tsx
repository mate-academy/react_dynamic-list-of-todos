import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { SelectedId } from '../../types/variables';
import { OnTodoSelect } from '../../types/functions';

type Props = {
  todos: Todo[];
  selectedTodoId: SelectedId;
  onTodoSelect: OnTodoSelect;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onTodoSelect,
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
          key={todo.id}
          todo={todo}
          selectedTodoId={selectedTodoId}
          onTodoSelect={onTodoSelect}
        />
      ))}
    </tbody>
  </table>
);
