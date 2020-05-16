import React, { useState } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import TodoList from './components/TodoList';
import './App.css';

import { getData } from './api/getData';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');

  const loadData = async () => {
    setLoading(true);

    try {
      const data = await getData();

      setTodos(data);
      setLoading(false);
      setLoaded(true);
    } catch (error) {
      setLoading(false);
      setError(`Something went wrong! ${error.message}`);
    }
  };

  return (
    <Segment inverted className="main">
      <Header as="h1" color="purple">
        Dynamic list of todos
      </Header>
      {isLoaded ? (
        <TodoList list={todos} />
      ) : (
        <>
          <Header as="h2" color="yellow">{isError}</Header>
          <Button
            content={isLoading ? 'Loading...' : 'Load TodoList'}
            color="purple"
            size="big"
            onClick={loadData}
          />
        </>
      )}
    </Segment>
  );
};

export default App;
