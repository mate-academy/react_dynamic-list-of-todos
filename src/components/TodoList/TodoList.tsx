import React, { SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { FilteringType } from '../../types/FilteringType';

type Props = {
  todos: Todo[]
  filter: FilteringType
  title: string,
  iconId: number,
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>,
  setTodoCard: React.Dispatch<SetStateAction<Todo | undefined>>,
  setIconId: React.Dispatch<SetStateAction<number>>
};

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
  title,
  iconId,
  setIsModalOpen,
  setTodoCard,
  setIconId,
}) => {
  let filtering;

  switch (filter) {
    case FilteringType.active:
      filtering = todos.filter((todo) => !todo.completed);
      break;
    case FilteringType.completed:
      filtering = todos.filter((todo) => todo.completed);
      break;
    default: filtering = todos;
  }

  const findMatches = filtering
    .filter((todo) => todo.title.trim().toLowerCase()
      .includes(title.trim().toLowerCase()));

  const handleEyeButton = (todo: Todo) => {
    setTodoCard(todo);
    setIsModalOpen(true);
    setIconId(todo.id);
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
        {title.trim().length > 0 ? (
          findMatches.map((todoItem) => (
            <tr
              data-cy="todo"
              className=""
              key={todoItem.id}
            >
              <td className="is-vcentered">{todoItem.id}</td>
              <td className="is-vcentered">
                {todoItem.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={todoItem.completed
                    ? 'has-text-success' : 'has-text-danger'}
                >
                  {todoItem.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleEyeButton(todoItem)}
                >
                  <span className="icon">
                    <i className={`far ${todoItem.id !== iconId ? 'fa-eye' : 'fa-eye-slash'}`} />
                  </span>
                </button>
              </td>
            </tr>
          ))
        ) : (

          filtering.map((todoItem) => (
            <tr
              data-cy="todo"
              className=""
              key={todoItem.id}
            >
              <td className="is-vcentered">{todoItem.id}</td>
              <td className="is-vcentered">
                {todoItem.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={todoItem.completed
                    ? 'has-text-success' : 'has-text-danger'}
                >
                  {todoItem.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleEyeButton(todoItem)}
                >
                  <span className="icon">
                    <i className={`far ${todoItem.id !== iconId ? 'fa-eye' : 'fa-eye-slash'}`} />
                  </span>
                </button>
              </td>
            </tr>
          ))
        )}

      </tbody>
    </table>
  );
};
