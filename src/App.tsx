/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [field, setField] = useState(FilterBy.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const getTodo = useCallback(async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  }, []);

  useEffect(() => {
    getTodo();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (field) {
      case FilterBy.Active:
        return !todo.completed;
      case FilterBy.Completed:
        return todo.completed;
      default:
        return true;
    }
  }).filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const findSelectedTodo = (todo:Todo) => {
    setSelectedTodo(todo);
  };

  const reserQuery = () => {
    setQuery('');
  };

  const resetSelectedTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setField={setField}
                resetQuery={reserQuery}
              />
            </div>

            <div className="block">
              {todos.length <= 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  findSelectedTodo={findSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          resetSelectedTodo={resetSelectedTodo}
        />
      )}
    </>
  );
};
