import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const getDefaultTodo = () => {
    return ({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState(getDefaultTodo());
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState(SortType.ALL);

  const normalizedQuery = query.toLowerCase();

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const getFilteredTodos = () => {
    let filteredTodos = [...todos];

    switch (sortType) {
      case SortType.ACTIVE:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case SortType.COMPLETED:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase()
        .includes(normalizedQuery));
    }

    return filteredTodos;
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
                onChangeQuery={(request: string) => {
                  setQuery(request);
                }}
              />
            </div>

            <div className="block">
              {(todos.length > 0) ? (
                <TodoList
                  todos={getFilteredTodos()}
                  selectedTodo={selectedTodo}
                  selectTodo={(todo) => {
                    setSelectedTodo(todo);
                  }}
                />
              ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo.userId !== 0 && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectTodo={(todo) => {
            setSelectedTodo(todo);
          }}
          getDefaultTodo={getDefaultTodo}
        />
      )}
    </>
  );
};
