import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[],
  setIsModalOpen: (value: boolean) => void,
  setSelectTodo: (todo: Todo) => void
  selectTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  setIsModalOpen,
  setSelectTodo,
  selectTodo,
}) => {
  const openModal = (todo: Todo) => {
    setIsModalOpen(true);
    setSelectTodo(todo);
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
        {visibleTodos.map((todo) => {
          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': todo.id === selectTodo?.id,
              })}
              key={todo.id}
            >

              <td className="is-vcentered">
                {todo.id}
              </td>

              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )
                : (<td className="is-vcentered" />)}

              <td className="is-vcentered is-expanded">
                <p
                  className={cn(
                    {
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
                    },
                  )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => openModal(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': true,
                        'fa-eye-slash': todo.id === selectTodo?.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}

        {/* <tr data-cy="todo" className="has-background-info-light"> */}
        {/*   <td className="is-vcentered">2</td> */}
        {/*   <td className="is-vcentered" /> */}
        {/*   <td className="is-vcentered is-expanded"> */}
        {/*     <p className="has-text-danger"> */}
        {/*       quis ut nam facilis et officia qui */}
        {/*     </p> */}
        {/*   </td> */}
        {/*   <td className="has-text-right is-vcentered"> */}
        {/*     <button */}
        {/*       data-cy="selectButton" */}
        {/*       className="button" */}
        {/*       type="button" */}
        {/*     > */}
        {/*       <span className="icon"> */}
        {/*         <i className="far fa-eye-slash" /> */}
        {/*       </span> */}
        {/*     </button> */}
        {/*   </td> */}
        {/* </tr> */}
      </tbody>
    </table>
  );
};
