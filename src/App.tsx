import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

enum TodoStatus {
  Completed = 'completed',
  NotCompleted = 'not',
}

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const loading = () => {
    setIsLoading(true);
  };

  const getServerError = () => {
    setServerError(true);
  };

  useEffect(() => {
    getTodos().then(async response => {
      if (response.ok) {
        setTodos(await response.json());
      } else {
        setServerError(true);
      }
    })
      .then(loading)
      .catch(getServerError);
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
      case TodoStatus.Completed:
        return preparedTodos.filter(todo => todo.completed);
      case TodoStatus.NotCompleted:

        return preparedTodos.filter(todo => !todo.completed);
      default:
        return preparedTodos;
    }
  };

  return (
    <div className="App">
      {serverError ? (
        <p>Server error...</p>
      ) : (
        <>
          {isLoading ? (
            <>
              <div className="App__sidebar">
                <TodoList
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                  todos={getPreparedTodos()}
                  selectUserId={setSelectedUserId}
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
            </>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
