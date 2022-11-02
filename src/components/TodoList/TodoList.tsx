import React, { useState } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [onSelect, setOnSelect] = useState(-1);
  const [open, setOpen] = useState(false);

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
                  'has-background-info-light': onSelect === id,
                })}
                key={id}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && <i className="fas fa-check" />}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      completed ? 'has-text-success' : 'has-text-danger'
                    }
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
                      setOpen(true);
                      setOnSelect(id);
                    }}
                  >
                    <i
                      className={classnames(
                        'far',
                        { 'fa-eye-slash': onSelect === id },
                        { 'fa-eye': onSelect !== id },
                      )}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {open && (
        <TodoModal
          todos={todos}
          setOpen={setOpen}
          onSelect={onSelect}
          setOnSelect={setOnSelect}
        />
      )}
    </>
  );
};
