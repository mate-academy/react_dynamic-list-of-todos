import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { OneTodo } from '../Todo/OneTodo';

interface TodoListProps {
  todos: Todo[];
  chooseTodo: (todo: Todo) => void;
  currentTodo: Todo | null;
}

export const TodoList: FC<TodoListProps> = (
  { todos, chooseTodo, currentTodo },
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
      {todos.map(todo => (
        <OneTodo
          todo={todo}
          chooseTodo={chooseTodo}
          currentTodo={currentTodo}
        />
      ))}
    </tbody>
  </table>
);
