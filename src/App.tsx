import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState<string>('all');

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectValue(value);
  };

  const getPreparedTodos = () => {
    const queryCase = query.toLowerCase();

    const preparedTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(queryCase)
    ));

    switch (selectValue) {
      case 'completed':
        return preparedTodos.filter(todo => todo.completed);
      case 'not':
        return preparedTodos.filter(todo => !todo.completed);
      default:
        return preparedTodos;
    }
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          todos={getPreparedTodos()}
          onUserSelect={setSelectedUserId}
          userId={selectedUserId}
          query={query}
          selectValue={selectValue}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              selectedUser={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
