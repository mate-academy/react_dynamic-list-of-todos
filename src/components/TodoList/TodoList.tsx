import { FC, memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  clickedTodoId: number;
}

export const TodoList: FC<Props> = memo(({
  todos,
  onSelectTodo,
  clickedTodoId,
}) => {
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
        {todos.map((todo) => {
          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': clickedTodoId === todo.id,
              })}
              key={todo.id}
            >
              <TodoItem
                todo={todo}
                onSelectedTodo={onSelectTodo}
                clickedTodoId={clickedTodoId}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
