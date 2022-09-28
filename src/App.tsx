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

export function getFilteredTodo(
  todos: Todo[],
  filterType: string,
  query: string,
) {
  const filterByType = todos.filter((todo) => {
    switch (filterType) {
      case 'active':
        return todo.completed === false;

      case 'completed':
        return todo.completed === true;

      default:
        return todo;
    }
  });

  return filterByType.filter(({ title }) => (
    title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ));
}

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const todosFromServer = await getTodos();

      setLoading(false);

      setTodo(todosFromServer);
    };

    fetchData();
  }, []);

  const filteredTodos = getFilteredTodo(todos, filterBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                setQuery={(queryFromInput) => {
                  setQuery(queryFromInput);
                }}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodo}
                    selectedTodo={(id) => {
                      setSelectedTodo(id);
                    }}
                    selectedUserId={(userId) => {
                      setSelectedUserId(userId);
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== 0
        && (
          <TodoModal
            userId={selectedUserId}
            selectedTodoId={selectedTodo}
            selectedTodo={(id) => {
              setSelectedTodo(id);
            }}
            selectedUserId={(userId) => {
              setSelectedUserId(userId);
            }}
          />
        )}
    </>
  );
};
