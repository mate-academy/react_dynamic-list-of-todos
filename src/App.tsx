/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';

import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

let todos: Todo [] = [];

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodo, setFilteredTodo] = useState<Todo []>([]);
  const [status, setStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const selectTodoHadler = (todo:Todo) => setSelectedTodo({ ...todo });
  const clearCurrentTodo = () => setSelectedTodo(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setFilteredTodo)
      .then(() => {
        todos = filteredTodo.map((todo: Todo) => ({ ...todo }));
      })
      .then(() => setLoading(false));
  }, []);

  const filterHandler = () => {
    let copyTodos = todos.map((todo: Todo) => ({ ...todo }));

    if (searchTerm.length > 0) {
      copyTodos = copyTodos.filter((todo:Todo) => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (status) {
      case 'active':
        copyTodos = copyTodos.filter((todo:Todo) => !todo.completed);
        break;

      case 'completed':
        copyTodos = copyTodos.filter((todo:Todo) => todo.completed);
        break;
      default:
        break;
    }

    setFilteredTodo(copyTodos);
  };

  useEffect(filterHandler, [searchTerm, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodo}
                    selectedTodo={selectedTodo}
                    selectTodoHadler={selectTodoHadler}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            closeHadler={clearCurrentTodo}
          />
        )}
    </>
  );
};
