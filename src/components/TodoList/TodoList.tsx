import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { getUser } from '../../api';
import { GlobalContext } from '../../reducer';
import { Todo } from '../../types/Todo';
import { State } from '../TodoFilter';

export const TodoList: React.FC = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const chooseUser = (id: number) => {
    dispatch({ type: 'CheckedUser', userId: id });
    getUser(id)
      .then(response => dispatch({ type: 'InfoUser', user: response }));
  };

  const filterSearch = (search: string, array: Todo[]) => {
    if (search) {
      return array
        .filter((el: Todo) => el.title.toLowerCase()
          .includes(state.filterBySearch.toLowerCase()));
    }

    return array;
  };

  const returnListTodo = useMemo(() => {
    const result = [...state.listTodos];

    if (state.filter === State.ACTIVE) {
      return filterSearch(state.filterBySearch, result)
        .filter((el: Todo) => !el.completed);
    }

    if (state.filter === State.COMPLETED) {
      return filterSearch(state.filterBySearch, result)
        .filter((el: Todo) => el.completed);
    }

    return filterSearch(state.filterBySearch, result);
  }, [state.filter, state.filterBySearch]);

  const selectElement = (el: Todo) => {
    dispatch({ type: 'CheckedTodo', todo: el });
    chooseUser(el.userId);
  };

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
        {
          returnListTodo.map((el: Todo) => {
            return (
              <tr
                data-cy="todo"
                className={classNames('', {
                  'has-background-info-light': state.checkTodo === el,
                })}
                key={el.id}
              >
                <td className="is-vcentered">{el.id}</td>
                <td className="is-vcentered">
                  {
                    el.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )
                  }
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={classNames({
                    'has-text-danger': !el.completed,
                    'has-text-success': el.completed,
                  })}
                  >
                    {el.title}

                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => selectElement(el)}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye-slash': state.checkTodo === el,
                        'fa-eye': state.checkTodo !== el,
                      })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
