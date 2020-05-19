import React, { useState } from 'react';
import './App.css';
import { getPreparedTodos } from './helpers/api';
import { TodoList } from './components/TodoList';
import { LoadButton } from './components/LoadButton';
import { SORT_BUTTONS } from './helpers/sorts';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  async function loadTodos() {
    const preparedTodos = await getPreparedTodos();

    setTodos(preparedTodos);
    setIsLoaded(true);
  }

  if (isReversed) {
    setTodos([...todos].reverse());
    setIsReversed(false);
  }

  const sortTodos = (sortName: string) => {
    switch (sortName) {
      case 'title':
        setTodos([...todos].sort((a, b) => (
          a.title.localeCompare(b.title)
        )));
        break;

      case 'completed':
        setTodos([...todos].sort((a, b) => (
          Number(b.completed) - Number(a.completed)
        )));
        break;

      case 'name':
        setTodos([...todos].sort((a, b) => (
          a.user.name.localeCompare(b.user.name)
        )));
        break;

      default:
        setTodos(todos);
        break;
    }
  };

  return (
    <div className="container">
      <h1 className="row center-align">Dynamic list of TODOs</h1>
      {!isLoaded ? (
        <div className="row center-align">
          <LoadButton loadTodos={loadTodos} />
        </div>
      ) : (
        <>
          <div className="row center-align">
            {SORT_BUTTONS.map(({ id, name, title }) => (
              <button
                key={id}
                type="button"
                className="waves-effect waves-light btn-large"
                onClick={() => sortTodos(name)}
              >
                {title}
              </button>
            ))}
            <button
              type="button"
              className="btn-floating btn-large cyan darken-4 ml1"
              onClick={() => setIsReversed(!isReversed)}
            >
              <i className="material-icons">autorenew</i>
            </button>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <TodoList todos={todos} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
