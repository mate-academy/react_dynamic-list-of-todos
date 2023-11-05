import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Option } from './types/FilterOptions';

interface FilterOptions {
  select: string;
  query: string;
}

function filterBy(todos: Todo[], { select, query }: FilterOptions): Todo[] {
  let filteredTodos = [...todos];

  if (select) {
    switch (select) {
      case Option.ACTIVE:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case Option.COMPLETED:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
        return filteredTodos;
    }
  }

  if (query) {
    const normilizeQuery = query.toLowerCase().trim();

    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(normilizeQuery));
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [select, setSelect] = useState('');
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Error! Please try later'))
      .finally(() => setIsLoading(false));
  }, [setTodos, setIsLoading]);

  const filteredTodos = filterBy(todos, { select, query });

  const resetModal = () => {
    setIsVisibleModal(false);
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
                select={select}
                query={query}
                setSelect={setSelect}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {errorMessage ? (
                <p>{errorMessage}</p>
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setIsVisibleModal={setIsVisibleModal}
                  setUserId={setUserId}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id || 0}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isVisibleModal && (
        <TodoModal
          userId={userId}
          selectedTodo={selectedTodo}
          resetModal={() => resetModal()}
        />
      )}
    </>
  );
};
