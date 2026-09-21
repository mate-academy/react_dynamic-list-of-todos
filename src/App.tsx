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
import { Status } from './types/Status';

function filteredTodos(filterStatus: Status, query: string, todoList: Todo[]) {
  let localList = [...todoList];

  if (query) {
    localList = localList.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (filterStatus) {
    case 'all':
      break;
    case 'active':
      localList = localList.filter(list => !list.completed);
      break;
    case 'completed':
      localList = localList.filter(list => list.completed);
      break;
  }

  return localList;
}

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');
  const visibleTodos = filteredTodos(status, query, todoList);

  useEffect(() => {
    getTodos()
      .then(response => setTodoList(response))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {!isLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={visibleTodos}
                  onTodoSelect={setSelectedTodo}
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
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
