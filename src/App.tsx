/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getTodos()
      .then((preparedTodos: Todo[]) => {
        setTodos(preparedTodos);
        setFilteredTodos(preparedTodos);
        setError(null);
      })
      .catch(e => {
        setError(e.message);
      });
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then((userFromServer: User) => {
        setUser(userFromServer);
      });
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setter={setFilteredTodos} />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  todoSetter={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {error && <div>Fk you bitch</div>}

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          user={user}
          todoSetter={setSelectedTodo}
          userSetter={setUser}
        />
      )}
    </>
  );
};

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
