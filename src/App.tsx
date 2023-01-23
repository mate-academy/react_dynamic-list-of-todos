/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import * as todosAPI from './api';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todosAPI.getTodos()
      .then(todo => setTodos(todo));
  }, []);

  const filterTodosByStatus = (sentStatus: string) => {
    let filteredTodos = todos;

    switch (sentStatus) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed ':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = todos;
    }

    setTodos(filteredTodos);
  };

  const filterTodosByTitle = (title: string) => {
    const filteredTodos = todos.filter(
      todo => todo.title.toLowerCase().includes(title.toLowerCase()),
    );

    setTodos(filteredTodos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelection={filterTodosByStatus} onFilter={filterTodosByTitle} />
            </div>

            <div className="block">
              <Loader todos={todos} />
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
