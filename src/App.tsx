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
  ] = useState<number | null>(0);

  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const getTodos = useCallback(async () => {
    setTodoList(await getTodosFromServer());
  }, []);

  const setId = useCallback((id: number) => {
    setSelectedUserId(id);
  }, []);

  const deleteUser = useCallback(() => {
    setSelectedUserId(null);
  }, [selectedUserId]);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todoList={todoList}
          setId={setId}
        />
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
