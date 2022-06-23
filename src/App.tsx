import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { TodoType } from './types/TodoType';
import { getTodosFromServer } from './api/api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState<number>(0);

  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const [todoErr, setTodoErr] = useState(false);

  const getTodos = useCallback(async () => {
    try {
      const todos = await getTodosFromServer();

      if (todos) {
        setTodoErr(false);
        setTodoList(todos);
      }
    } catch (error) {
      setTodoErr(true);
    }
  }, []);

  const setId = useCallback((id: number) => {
    setSelectedUserId(id);
  }, []);

  const deleteUser = useCallback(() => {
    setSelectedUserId(0);
  }, [selectedUserId]);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {!todoErr
          ? (
            <TodoList
              todoList={todoList}
              setId={setId}
            />
          )
          : <p>Nothing finded</p>}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              deleteUser={deleteUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
