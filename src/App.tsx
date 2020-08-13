import React, { useState } from 'react';
import TodoList from './components/TodoList';
import { Todo, User } from './interfaces';
import './App.scss';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function start() {
    setLoading(true);
    const load = await Promise.all([
      fetch('https://mate.academy/students-api/todos')
        .then(response => response.json())
        .then(response => {
          setTodos(response.data);
        }),
      fetch('https://mate.academy/students-api/users')
        .then(response => response.json())
        .then(response => {
          setUsers(response.data);
        }),
    ]);

    if (load) {
      setShow(true);
    }
  }

  const onSortbyTitle = () => {
    const sorted = [...todos].sort((a: Todo, b: Todo) => (a.title).localeCompare(b.title));

    setTodos(sorted);
  };

  const onSortbyCompleted = () => {
    const sorted = [...todos].sort((a: Todo, b: Todo) => +a.completed - +b.completed);

    setTodos(sorted);
  };

  const onSortbyName = () => {
    const sorted = [...todos].sort((a: Todo, b: Todo) => {
      const name1: User | undefined = users.find((user: User) => user.id === a.userId);
      const name2: User | undefined = users.find((user: User) => user.id === b.userId);

      if (name1 !== null && name1 !== undefined && name2 !== null && name2 !== undefined) {
        return name1.name.localeCompare(name2.name);
      }

      return 0;
    });

    setTodos(sorted);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <button type="button" onClick={onSortbyTitle}>
          Title
        </button>
        {' '}
        <button type="button" onClick={onSortbyCompleted}>
          Completed
        </button>
        {' '}
        <button type="button" onClick={onSortbyName}>
          Name
        </button>
      </header>

      <section
        className="main"
      >
        {show && (
          <TodoList
            todos={todos}
            users={users}
          />
        )}
        {loading
          && (<button type="button">Loading...</button>)}
        {!show && !loading
          && (<button type="button" onClick={start}>Load</button>)}

      </section>

      <footer className={todos.length > 0 ? 'footer' : 'footer hide'}>
        <span className="todo-count">
          {todos.filter((todo: Todo) => !todo.completed).length}
          {' '}
          items left
        </span>
      </footer>
    </section>
  );
};

export default App;
