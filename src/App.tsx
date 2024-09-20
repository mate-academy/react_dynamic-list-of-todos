// /* eslint-disable max-len */
// import React from 'react';
// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';

// import { TodoList } from './components/TodoList';
// import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

// export const App: React.FC = () => {
//   return (
//     <>
//       <div className="section">
//         <div className="container">
//           <div className="box">
//             <h1 className="title">Todos:</h1>

//             <div className="block">
//               <TodoFilter />
//             </div>

//             <div className="block">
//               <Loader />
//               <TodoList />
//             </div>
//           </div>
//         </div>
//       </div>

//       <TodoModal />
//     </>
//   );
// };

/* eslint-disable max-len */
// App.tsx
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { getTodos, getUsers } from './api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      Promise.all([getTodos(), getUsers()])
        .then(([loadedTodos, loadedUsers]) => {
          setTodos(loadedTodos);
          setFilteredTodos(loadedTodos);
          setUsers(loadedUsers);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  const filterTodos = (searchQuery: string, filterStatus: string = 'all') => {
    let filtered = todos;

    if (filterStatus === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filterStatus === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (searchQuery !== '') {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    setFilter(newValue);
    filterTodos(query, newValue);
  };

  const handleTodoSelect = (todo: Todo) => {
    setModalLoading(true);

    setTimeout(() => {
      setSelectedTodo(todo);
      setModalLoading(false);
    }, 1000);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    filterTodos(newQuery, filter);
  };

  const clearQuery = () => {
    setQuery('');
    setFilteredTodos(todos);
    filterTodos('');
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
                onQueryChange={handleQueryChange}
                onClearQuery={clearQuery}
                filter={filter}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  users={users}
                  onTodoSelect={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && !modalLoading && (
        <TodoModal
          todo={selectedTodo}
          users={users}
          onClose={handleCloseModal}
          loading={modalLoading}
        />
      )}
    </>
  );
};
