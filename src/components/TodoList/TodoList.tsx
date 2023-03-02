import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  selectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    selectTodo,
    selectedTodo,
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
          {
            todos.map(todo => {
              const isSelectedTodo = todo.id === selectedTodo?.id;

              return (
                <TodoItem
                  todo={todo}
                  isSelectedTodo={isSelectedTodo}
                  selectTodo={selectTodo}
                  key={todo.id}
                />
              );
            })
          }
        </tbody>
      </table>
    );
  },
);
