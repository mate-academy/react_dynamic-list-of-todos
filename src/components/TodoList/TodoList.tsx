import React, { useState } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [selectedTodoId, setSelectedTodoId] = useState(-1);
  const [opened, setOpened] = useState(false);

  return (
    <>
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
          {todos.map(({ id, completed, title }) => {
            return (
              <tr
                data-cy="todo"
                className={classnames({
                  'has-background-info-light': selectedTodoId === id,
                })}
                key={id}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && <i className="fas fa-check" />}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classnames({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    })}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    key={id}
                    onClick={() => {
                      setOpened(true);
                      setSelectedTodoId(id);
                    }}
                  >
                    <i
                      className={classnames(
                        'far',
                        { 'fa-eye-slash': selectedTodoId === id },
                        { 'fa-eye': selectedTodoId !== id },
                      )}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {opened && (
        <TodoModal
          todos={todos}
          setOpen={setOpened}
          onSelect={selectedTodoId}
          setOnSelect={setSelectedTodoId}
        />
      )}
    </>
  );
};
