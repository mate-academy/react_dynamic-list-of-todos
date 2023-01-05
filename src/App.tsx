/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Condition } from './types/Condition';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getApiTodos = async () => {
    const data = await getTodos();

    setTodos(data);
    setDataLoaded(true);
  };

  useEffect(() => {
    getApiTodos();
  });

  const normalizeTodosWithQuery = todos.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase());
  });

  const filteredTodos = normalizeTodosWithQuery.filter(todo => {
    switch (filterType) {
      case Condition.active:
        return todo.completed === false;
      case Condition.completed:
        return todo.completed === true;
      default:
        return Condition.all;
    }
  });

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
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {!dataLoaded && <Loader />}
              <TodoList
                todos={filteredTodos}
                setSelectedTodoId={setSelectedTodoId}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId
        && (
          <TodoModal
            todos={filteredTodos}
            setSelectedTodoId={setSelectedTodoId}
            selectedTodoId={selectedTodoId}
          />
        )}
    </>
  );
};
