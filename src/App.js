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

  const loadAll = async() => {
    setLoading(true);

    const todosArr = await getDataFromServer(urlTodos);
    const usersArr = await getDataFromServer(urlUser);

    const usersAndTodos = todosArr.map(todo => ({
      ...todo,
      user: usersArr.find(human => human.id === todo.userId),
    }));

    saveTodos(usersAndTodos);
    toggleState(true);
  };

  const sortByTitle = () => {
    const sortTitle = [...usersAndTodosArr]
      .sort((a, b) => a.title.localeCompare(b.title));

    saveTodos(sortTitle);
  };

  const sortByName = () => {
    const sortTitle = [...usersAndTodosArr]
      .sort((a, b) => a.user.name.localeCompare(b.user.name));

    saveTodos(sortTitle);
  };

  const sortByProssecc = () => {
    const sortTitle = [...usersAndTodosArr]
      .sort((a, b) => a.completed - b.completed);

    saveTodos(sortTitle);
    console.log(sortTitle);
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
            sortByProssecc={sortByProssecc}
          />
        )
        }
      </section>
    </div>
  );
};

export default App;
