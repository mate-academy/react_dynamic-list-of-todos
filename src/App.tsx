import React from 'react';
import { getTodos } from './data/api'
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const [
    selectedUserId,
    setSelectedUserId,
  ] = React.useState(0);

  React.useEffect(() => {
    getTodos().then(data => setTodos(data))
  }, []);

  const selectedUser = ( userId: number) => setSelectedUserId(userId);

  const onClearUser = () => {
    setSelectedUserId(0);
  }

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList 
          todos={todos} 
          selectedUserId={selectedUserId} 
          selectUser={selectedUser} 
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser 
              userId={selectedUserId} 
              onClear={onClearUser} 
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
