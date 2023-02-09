import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoLoadStatus, setTodoLoadStatus] = useState(true);
  const [selectedTodoUserId, setSelectedTodoUserId]
  = useState<number | null>(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterByStatus, setFilterByStatus] = useState(SortType.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
        setTodoLoadStatus(false);
      });
  }, []);

  const getFilteredTodos = () => {
    return todos.filter(todo => {
      const includesQuery = todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());

      switch (filterByStatus) {
        case 'active':
          return !todo.completed && includesQuery;

        case 'completed':
          return todo.completed && includesQuery;

        case 'all':
        default:
          return includesQuery;
      }
    });
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
                onChangeQuery={setQuery}
                status={filterByStatus}
                onChangeStatus={setFilterByStatus}
              />
            </div>

            <div className="block">
              {todoLoadStatus
                ? <Loader />
                : (
                  <TodoList
                    todos={getFilteredTodos()}
                    onTodoUserId={setSelectedTodoUserId}
                    modalStatus={modalStatus}
                    onModalStatus={setModalStatus}
                    onSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalStatus && (
        <TodoModal
          todoUserId={selectedTodoUserId}
          modalStatus={modalStatus}
          onModalStatus={setModalStatus}
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
