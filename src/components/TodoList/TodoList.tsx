import classNames from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { SetTodoModalType } from '../../types/TodoModal';

interface TodoListProps {
  todos: Todo[];
  setTodoModal: Dispatch<SetStateAction<SetTodoModalType>>;
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

}

export const TodoList: React.FC<TodoListProps> = (
  {
    todos, setTodoModal, isClicked, setIsClicked, setIsLoading,
  },
) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null >(null);

  const extractUser = async (todo: Todo) => {
    setIsClicked(true);
    setIsLoading(true);
    const user = await getUser(todo.userId);

    setTodoModal({
      user,
      todo,
    });

    setSelectedTodoId(todo.id);
    setIsLoading(false);
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
        {todos.map((todo, index) => (
          <tr key={todo.id} data-cy="todo" className="">

            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">
              {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => extractUser(todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye-slash': isClicked && selectedTodoId === todo.id,
                    'fa-eye': !isClicked || selectedTodoId !== todo.id,
                  })}
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
