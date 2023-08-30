import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoFC } from '../TodoFC';
import { User } from '../../types/User';

interface Props {
  todos: Todo[];
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodo: Todo;
  setUserId: React.Dispatch<React.SetStateAction<User['id']>>;
}

export const TodoList: React.FC<Props> = ({
  todos, setSelectedTodo, setUserId, selectedTodo,
}) => (
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
        return (
          <TodoFC
            key={todo.id}
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            setUserId={setUserId}
            selectedTodo={selectedTodo}
          />
        );
      })}
    </tbody>
  </table>
);
