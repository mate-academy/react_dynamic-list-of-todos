import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import getDataFromServer from './getDataFromServer';

const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const urlUser = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [contentHidden, setContentHidden] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedButton, setValueButton] = useState('');

  const loadAll = async() => {
    setLoading(true);

    const [todosArr, usersArr] = await
    Promise.all([getDataFromServer(urlTodos), getDataFromServer(urlUser)]);

    const usersAndTodos = todosArr.map(todo => ({
      ...todo,
      user: usersArr.find(human => human.id === todo.userId),
    }));

    setTodos(usersAndTodos);
    setContentHidden(true);
  };

  const sortTodos = (x) => {
    switch (x) {
      case 'title':
        if (x !== selectedButton) {
          setTodos([...todos]
            .sort((a, b) => a.title.localeCompare(b.title)));
          setValueButton(x);
        }
        break;

      case 'name':
        if (x !== selectedButton) {
          setTodos([...todos]
            .sort((a, b) => a.user.name.localeCompare(b.user.name)));
          setValueButton(x);
        }
        break;

      case 'progress':
        if (x !== selectedButton) {
          setTodos([...todos]
            .sort((a, b) => a.completed - b.completed));
          setValueButton(x);
        }
        break;
      default: setTodos([...todos]);
    }

    if (x === selectedButton) {
      const sortTitle = [...todos].reverse();

      setTodos(sortTitle);
    }
  };

  return (
    <section className="listTodos">
      <h1 className="listTodos__title">Dynamic list of todos</h1>
      <section>
        {!contentHidden ? (
          <button type="button" onClick={loadAll} className="button">
            {!isLoading ? 'Load All' : 'Is loading...' }
          </button>
        ) : (
          <TodoList
            todos={todos}
            sortTodos={sortTodos}
          />
        )
        }
      </section>
    </section>
  );
};

export default App;
