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
import { Sorttype } from './types/Sorttype';

export const App: React.FC = () => {
  const [loadOn, setLoadOn] = useState(false);
  const [todos, setToDos] = useState<Todo[]>([]);
  const [modalOn, setmodalOn] = useState(false);
  const [modalToDo, setmodalTodo] = useState<Todo | null>(null);
  const [sortType, setSortType] = useState<string>(Sorttype.all);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setLoadOn(true);
    getTodos().then(todoos => setToDos(todoos)).finally(() => setLoadOn(false));
  }, []);

  const preparedTodos = () => {
    let displayTodos = [...todos];

    if (query) {
      displayTodos = displayTodos.filter(
        todo => todo.title.toLowerCase()
          .includes(query.toLowerCase().trim()),
      );
    }

    switch (sortType) {
      case Sorttype.active:
        return displayTodos.filter(todo => !todo.completed);

      case Sorttype.completed:
        return displayTodos.filter(todo => todo.completed);

      default:
        break;
    }

    return displayTodos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortType={sortType}
                setSortType={setSortType}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadOn ? <Loader />
                : (
                  <TodoList
                    todos={preparedTodos()}
                    setmodalOn={setmodalOn}
                    setmodalTodo={setmodalTodo}
                    modalToDo={modalToDo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {modalOn && (
        <TodoModal
          modalToDo={modalToDo}
          setmodalOn={setmodalOn}
          setmodalTodo={setmodalTodo}
        />
      )}

    </>
  );
};
