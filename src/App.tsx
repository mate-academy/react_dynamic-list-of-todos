import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

enum TodoStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [errorText, setErrorText] = useState('');
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('');

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch((error) => setErrorText(error.toString()));
  }, []);

  if (errorText) {
    return (
      <div>
        {errorText}
      </div>
    );
  }

  const getVisibleTodos = (
    todosFromServer: Todo[],
    queryFromInput: string,
  ): Todo[] => {
    let filteredTodos = todos;

    filteredTodos = todosFromServer.filter(todo => (
      todo.title.toLowerCase().includes(queryFromInput.toLowerCase())
    ));

    switch (selectValue) {
      case TodoStatus.Active:
        return filteredTodos.filter(todo => !todo.completed);
      case TodoStatus.Completed:
        return filteredTodos.filter(todo => todo.completed);

      case TodoStatus.All:
      default:
        return filteredTodos;
    }
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <h2>Todos:</h2>

        <input
          type="text"
          className="TodoList__input"
          placeholder="Type search word"
          value={query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(event.currentTarget.value);
          }}
        />

        <select
          className="TodoList__select"
          onChange={(event) => setSelectValue(event.target.value)}
          value={selectValue}
        >
          {Object.keys(TodoStatus).map(key => (

            <option
              value={key}
              key={key}
            >
              {key}
            </option>

          ))}
        </select>

        {todos ? (
          <TodoList
            todos={todos}
            onSelect={setSelectedUserId}
            getVisibleTodos={getVisibleTodos}
            query={query}
          />
        ) : (
          <p>loading...</p>
        )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onSetSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
