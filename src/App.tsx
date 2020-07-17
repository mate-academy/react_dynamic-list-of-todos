import React, { FC, useState } from 'react';

import Header from './components/Header/Header';
import View from './components/View/View';
import Error from './components/Error/Error';
import LoadButton from './components/LoadButton/LoadButton';
import './App.css';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

  return (
    <>
      <Header />
      {todos.length > 0 && <View todos={todos} />}
      {isLoadingError && <Error />}
      {
        todos.length === 0
        && (
          <LoadButton
            setTodos={setTodos}
            setIsLoadingError={setIsLoadingError}
          />
        )
      }
    </>
  );
};

export default App;
