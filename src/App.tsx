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
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodosList] = useState<Todo[] | []>([]);
  // const [selectedUserId, setSelectedUser] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedQuery, setSelectedQuery] = useState('');

  useEffect(() => {
    getTodos().then(allTodos => setTodosList(allTodos));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                setSelectedQuery={setSelectedQuery}
                selectedQuery={selectedQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                    selectedFilter={selectedFilter}
                    selectedQuery={selectedQuery}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo?.userId && (
        <TodoModal
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
