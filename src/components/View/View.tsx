import React, { FC, useState } from 'react';

import { TodosList } from '../TodosList/TodosList';

interface Props {
  todos: Todo[];
}

export const View: FC<Props> = ({ todos }) => {
  const [todosSortBy, setTodosSortBy] = useState<string>('title');

  switch (todosSortBy) {
    case 'title':
      todos.sort((todo1, todo2) => todo1.title.localeCompare(todo2.title));
      break;

    case 'completed':
      todos.sort((todo) => (todo.completed ? 1 : -1));
      break;

    case 'name':
      todos.sort((todo1, todo2) => {
        if (todo1.user && todo2.user) {
          return todo1.user.name.localeCompare(todo2.user.name);
        }

        return 1;
      });
      break;

    default:
      todos.sort((todo1, todo2) => todo1.title.localeCompare(todo2.title));
      break;
  }

  return (
    <div className="app__view">
      <button
        className="app__view-button"
        type="button"
        onClick={() => setTodosSortBy('title')}
      >
        Sort by title
      </button>
      <button
        className="app__view-button"
        type="button"
        onClick={() => setTodosSortBy('completed')}
      >
        Sort by completed
      </button>
      <button
        className="app__view-button"
        type="button"
        onClick={() => setTodosSortBy('name')}
      >
        Sort by name
      </button>
      <TodosList todos={todos} />
    </div>
  );
};
