/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
// import { User } from './types/User';
import './App.scss';
import { TypeOfFilter } from './types/typeOfFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [querry, setQuerry] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [typeFilter, setTypeFilter] = useState<TypeOfFilter>(TypeOfFilter.All);

  const filteredTodos = useMemo(() => {
    let copy = [...todos];

    if (querry) {
      copy = copy.filter(todo => todo.title.toLowerCase().includes(querry.toLowerCase()));
    }

    if (typeFilter === TypeOfFilter.Active) {
      copy = copy.filter(todo => !todo.completed);
    }

    if (typeFilter === TypeOfFilter.Complited) {
      copy = copy.filter(todo => todo.completed);
    }

    return copy;
  }, [todos, querry, typeFilter]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuerry={setQuerry}
                querry={querry}
                setTypeFilter={setTypeFilter}

              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
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
