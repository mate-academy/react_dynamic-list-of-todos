import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  useEffect(() => {
    getTodos().then(fetchedData => {
      setTodos(fetchedData);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (selectedId !== null) {
      setSelectedTodo(todos.filter(todo => todo.id === selectedId)[0]);
    }
  }, [selectedId, todos]);

  let filteredTodos;

  switch (filter) {
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    default:
      filteredTodos = todos;
  }

  filteredTodos = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(searchString.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setSearchString={setSearchString}
                searchString={searchString}
              />
            </div>

            {!loaded ? (
              <Loader />
            ) : (
              <TodoList
                todos={filteredTodos}
                setSelectedId={setSelectedId}
                selectedId={selectedId}
              />
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          getUser={getUser}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          setSelectedId={setSelectedId}
        />
      )}
    </>
  );
};
