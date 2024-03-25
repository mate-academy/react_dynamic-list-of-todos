/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './services/todo';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getUsers } from './services/user';

function getFilteredTodos(tododos: Todo[], query: string, queryInput: string) {
  const preparedTodos = tododos.filter(tododo => {
    if (query === 'active') {
      return tododo.completed === false;
    } else if (query === 'completed') {
      return tododo.completed === true;
    } else {
      return tododos;
    }
  });

  let readyTodos;

  if (queryInput !== '') {
    readyTodos = preparedTodos.filter(readyTodo =>
      readyTodo.title.includes(queryInput),
    );

    return readyTodos;
  }

  return preparedTodos;
}

function getUserById(users: User[], userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectChecked, setSelectChecked] = useState('all');
  const [textInput, setTextInput] = useState('');
  const [checkedTodoId, setCheckedTodoId] = useState(0);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
    getUsers()
      .then(setUsers);
  }, []);

  const visibleTodos = getFilteredTodos(todos, selectChecked, textInput);
  const checkedUser = getUserById(users, checkedTodoId);
  
  

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                checkedQuery={setSelectChecked}
                textInput={textInput}
                instTextInput={setTextInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList todos={visibleTodos} checkedTodoId={setCheckedTodoId}/>
            </div>
          </div>
        </div>
      </div>

      {checkedTodoId > 0 && (
        <TodoModal user={checkedUser}/>
      )}
    </>
  );
};
