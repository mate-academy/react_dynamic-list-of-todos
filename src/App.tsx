import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
// import { getTodos } from './api/api';
// import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(0);
  // const [todos, setTodos] = useState<Todo[]>([]);

  // useEffect(() => {
  //   getTodos()
  //     .then(todoItems => {
  //       setTodos(todoItems);
  //     });
  // }, []);

  const userIdHandler = (id: number) => {
    // const selectedTodo = todos.find(todo => todo.userId === id) || null;

    setSelectedUserId(id || 0);
  };

  const clearHandler = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          onHandlerUserId={userIdHandler}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onHandlerClear={clearHandler}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
