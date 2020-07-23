import React from 'react';
import './App.css';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface State {
  setLoading: boolean;
  setLoaded: boolean;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    setLoading: false,
    setLoaded: false,
    todos: [],
  };

  render() {
    const {
      setLoading,
      setLoaded,
      todos,
    } = this.state;

    return (
      <>
        <h1>Dynamic list of TODOs</h1>
        {
          (!setLoaded)
            ? (
              <button type="button">
                {setLoading ? 'Loading...' : 'Load'}
              </button>
            ) : (
              <div>
                here will be some list of
                {todos}
              </div>
            )
        }
      </>
    );
  }
}

export default App;
