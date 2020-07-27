import React, { FC, useState } from 'react';

import { Header } from './components/Header/Header';
import { View } from './components/View/View';
import { Error } from './components/Error/Error';
import { LoadButton } from './components/LoadButton/LoadButton';
import './App.css';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <Header />
      {isLoaded && <View todos={todos} />}
      {isLoadingError && <Error />}
      {
        !isLoaded
        && (
          <LoadButton
            setTodos={setTodos}
            setIsLoaded={setIsLoaded}
            setIsLoadingError={setIsLoadingError}
          />
        )
      }
    </>
  );
};

export default App;
