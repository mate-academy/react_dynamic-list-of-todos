import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  selectTodoWithUser: (newSelectedTodo: Todo) => void;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    selectedTodoId,
    selectTodoWithUser,
  }) => {
    // console.log('render list');

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
          {todos.map(todo => (
            <TodoInfo
              key={todo.id}
              todo={todo}
              isSelected={todo.id === selectedTodoId}
              selectTodoWithUser={() => selectTodoWithUser(todo)}
            />
          ))}
        </tbody>
      </table>
    );
  },
);
