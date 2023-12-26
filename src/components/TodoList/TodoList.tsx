import React, { useMemo } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { getTodosByStatus } from '../../services/getTodosByStatus';
import { getTodosByQuery } from '../../services/getTodosByQuery';
import { TodoItemData } from '../TodoItemData/TodoItemData';

type Props = {
  todos: Todo[]
  query: string
  selectedOption: Status
  selctedTodo: Todo | null
  onTodoSelected: (val: Todo) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  query,
  selctedTodo,
  selectedOption,
  onTodoSelected,
}) => {
  const filteredTodo = useMemo(() => {
    return getTodosByQuery(getTodosByStatus(todos, selectedOption), query);
  }, [todos, selectedOption, query]);

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
        {filteredTodo.map((todo) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames('',
              { 'has-background-info-light': selctedTodo === todo })}
          >
            <TodoItemData todo={todo} />

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onTodoSelected(todo)}
              >
                <span className="icon">
                  <i className={classNames('',
                    { 'far fa-eye': selctedTodo !== todo },
                    { 'far fa-eye-slash': selctedTodo === todo })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};
