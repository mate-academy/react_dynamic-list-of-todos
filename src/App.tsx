/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { getFilteredTodos } from './utils/FilterTodos';
import { AgroupField } from './types/AgroupField';

export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [agroupField, setAgroupField] = useState<AgroupField>(AgroupField.ALL);

  useEffect(() => {
    getTodos()
    .then((response: Todo[]) => {
      setTodos(response)
    })
    .finally(() => setLoaderStatus(false))
  }, []);

  const filteredTodos = getFilteredTodos(todos, { query, agroupField });

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
                agroupField={agroupField}
                setAgroupField={setAgroupField}
              />
            </div>

            <div className="block">
              {loaderStatus ?
                <Loader /> :
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
      
    </>
  );
};
