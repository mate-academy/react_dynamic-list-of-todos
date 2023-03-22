import React, { memo } from 'react';
import { TodoListProps } from '../../types/TodoProps';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC<TodoListProps> = memo(
  ({
    todos,
    selectedTodoId,
    showTodoInfo,
  }) => {
    if (!todos.length) {
      return (
        <div className="message is-warning">
          <div className="message-body">
            <p className="m-3">There is not result!</p>
          </div>
        </div>
      );
    }

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
            <TodoItem
              todo={todo}
              key={todo.id}
              selectedTodoId={selectedTodoId}
              showTodoInfo={showTodoInfo}
            />
          ))}
        </tbody>
      </table>
    );
  },
);
