import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import getDataFromServer from './getDataFromServer';

const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const urlUser = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [usersAndTodosArr, saveTodos] = useState([]);
  const [visibleContent, toggleState] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [reverseTitle, setReverseTitle] = useState(true);
  const [reverseName, setReverseName] = useState(true);
  const [reverseProgress, setReverseProgress] = useState(true);

  const loadAll = async() => {
    setLoading(true);

    const [todosArr, usersArr] = await
    Promise.all([getDataFromServer(urlTodos), getDataFromServer(urlUser)]);

    const usersAndTodos = todosArr.map(todo => ({
      ...todo,
      user: usersArr.find(human => human.id === todo.userId),
    }));

    saveTodos(usersAndTodos);
    toggleState(true);
  };

  const sortByTitle = () => {
    if (!reverseTitle) {
      const sortTitle = [...usersAndTodosArr].reverse();

      saveTodos(sortTitle);
    }

    if (reverseTitle) {
      const sortTitle = [...usersAndTodosArr]
        .sort((a, b) => a.title.localeCompare(b.title));

      saveTodos(sortTitle);
      setReverseTitle(false);
    }
  };

  const sortByName = () => {
    if (!reverseName) {
      const sortTitle = [...usersAndTodosArr].reverse();

      saveTodos(sortTitle);
    }

    if (reverseName) {
      const sortTitle = [...usersAndTodosArr]
        .sort((a, b) => a.user.name.localeCompare(b.user.name));

      saveTodos(sortTitle);
      setReverseName(false);
    }
  };

  const sortByProgress = () => {
    if (!reverseProgress) {
      const sortTitle = [...usersAndTodosArr].reverse();

      saveTodos(sortTitle);
    }

    if (reverseProgress) {
      const sortTitle = [...usersAndTodosArr]
        .sort((a, b) => a.completed - b.completed);

      saveTodos(sortTitle);
      setReverseProgress(false);
    }
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <section>
        {!visibleContent ? (
          <button type="button" onClick={loadAll}>
            {!isLoading ? 'Load All' : 'Is loading...' }
          </button>
        ) : (
          <TodoList
            usersAndTodosArr={usersAndTodosArr}
            sortByTitle={sortByTitle}
            sortByName={sortByName}
            sortByProgress={sortByProgress}
          />
        )
        }
      </section>
    </div>
  );
};

export default App;
