import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

interface Props {
  selectedTodoId: (v: number) => void,
  selectedTodo: Todo | undefined,
  filteredList: Todo[]
}

export const TodoList: React.FC<Props> = (props) => {
  // const [isTodoLoading, setIsTodoLoading] = useState(true);
  const { selectedTodoId, selectedTodo, filteredList } = props;

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
          {filteredList.map((todo) => {
            return (
              false
                ? <Loader />
                : (
                  <tr
                    key={todo.id}
                    data-cy="todo"
                    className={cn(selectedTodo
                      && selectedTodo.id === todo.id
                      && 'has-background-info-light')}
                  >
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className={cn(todo.completed && 'fas fa-check')} />
                      </span>
                    </td>
                    <td className="is-vcentered is-expanded">
                      <p className={cn(todo.completed
                        ? 'has-text-success'
                        : 'has-text-danger')}
                      >
                        { todo.title }
                      </p>
                    </td>
                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => selectedTodoId(todo.id)}
                      >
                        <span className="icon">
                          <i className={cn(selectedTodo?.id === todo.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye')}
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                )
            );
          })}
        </tbody>
      </table>
    </>
  );
};
