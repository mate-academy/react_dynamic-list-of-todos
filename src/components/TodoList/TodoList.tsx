import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: Todo[]
  onEyeButtonClick: (todoId: number) => void
  clickedTodoId: number
};

export const TodoList = (
  { todos, onEyeButtonClick, clickedTodoId }: TodoListProps,
) => (
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
        const todoId = todo.id;
        const buttonClassName = classNames(
          'far',
          `fa-eye${todoId === clickedTodoId ? '-slash' : ''}`,
        );

        return (
          <TodoInfo
            key={todoId}
            todo={todo}
            onEyeButtonClick={onEyeButtonClick}
            detailsButtonClassNames={buttonClassName}
          />
        );
      })}
    </tbody>
  </table>
);
