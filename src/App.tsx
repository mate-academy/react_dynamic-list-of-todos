import React, { useState } from 'react';
import { getTodos, getUsers } from './api/todos&users/todos&users';
import { TodoList } from './components/TodoList';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<PreparedTodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   getTodos().then(setTodos);
  //   getUsers().then(setUsers);
  // }, []);

  const loadTodos = async () => {
    setIsLoading(true);
    const todosFromApi = await getTodos();
    const usersFromApi = await getUsers();

    setTodos(todosFromApi.map(todo => ({
      ...todo,
      user: usersFromApi.find(person => person.id === todo.userId) as User,
    })));
    setIsLoading(false);
  };

  const sortByTitle = () => {
    setTodos([...todos]
      .sort((todoA, todoB) => (
        todoA.title.localeCompare(todoB.title)
      )));
  };

  const sortByName = () => {
    setTodos([...todos]
      .sort((todoA, todoB) => (
        todoA.user.name.localeCompare(todoB.user.name)
      )));
  };

  const showCompleted = () => {
    setTodos([...todos]
      .sort((todoA, todoB) => (
        Number(todoB.completed) - Number(todoA.completed)
      )));
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="main">
      <div>
        {!todos.length
          ? (
            <button
              className="btn btn-primary"
              type="button"
              onClick={loadTodos}
            >
              Load All
            </button>
          )
          : (
            <TodoList
              todos={todos}
              sortByTitle={sortByTitle}
              sortByName={sortByName}
              showCompleted={showCompleted}
            />
          )}
      </div>
    </div>
  );
};

export default App;
