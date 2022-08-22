import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { List } from '../List/List';

type Props = {
  todoList: Todo[];
  openedTodoId: number | null;
  filterOption: boolean | null;
  filterQuery: string;
  onClick: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = (
  {
    todoList,
    openedTodoId,
    filterOption,
    filterQuery,
    onClick,
  },
) => {
  let visibleTodos = [...todoList];

  if (filterOption !== null) {
    visibleTodos = todoList.filter(todo => todo.completed === filterOption);
  }

  visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase()
    .includes(filterQuery.toLowerCase()));

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
        {visibleTodos.map((todo: Todo) => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={
              classNames({
                'has-background-info-light': openedTodoId === todo.id,
              })
            }
          >
            <List
              openedTodoId={openedTodoId}
              onClick={onClick}
              todo={todo}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
