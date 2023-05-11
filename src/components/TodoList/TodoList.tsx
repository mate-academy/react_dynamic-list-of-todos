import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';

type Props = {
  todos: Todo[];
  onShowTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onShowTodo,
  selectedTodo,
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
        {todos.map(todo => {
          const isTodoSelected = selectedTodo?.id === todo.id;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isTodoSelected,
              })}
              key={todo.id}
            >

              <TodoItem
                todo={todo}
                onShowTodo={onShowTodo}
                isTodoSelected={isTodoSelected}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
