import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBy, setFilteredBy]
    = useState<TodosFilter>(TodosFilter.DEFAULT);

  const showInfo = (id: number) => {
    const todoInfo = todos.find(item => item.id === id) || todos[0];

    setTodo(todoInfo);
  };

  const hideInfo = () => {
    setTodo(null);
  };

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const prepareTasks = () => {
    return todos
      .filter(task => {
        if (filteredBy === TodosFilter.ACTIVE) {
          return !task.completed;
        }

        if (filteredBy === TodosFilter.COMPLETED) {
          return task.completed;
        }

        return task;
      })
      .filter(task => {
        return task.title.includes(searchQuery);
      });
  };

  const preparedTodos = prepareTasks();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredBy={filteredBy}
                setFilteredBy={setFilteredBy}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    showInfo={showInfo}
                    todos={preparedTodos}
                    id={todo?.id}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {todo && (
        <TodoModal
          todo={todo}
          hideInfo={hideInfo}
        />
      )}
    </>
  );
};
