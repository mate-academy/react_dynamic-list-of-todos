import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import Loader from './components/Loader';
import { getTodos, getUser } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await getTodos();
        await getUser(1);

        const todosData = await getTodos();

        setTodos(todosData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowButtonClick = async (todo) => {
    setSelectedTodo(todo);

    setIsLoading(true);
    const user = await getUser(todo.userId);

    setUserDetails(user);
    setIsLoading(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos}
                handleShowButtonClick={handleShowButtonClick}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal selectedTodo={selectedTodo} userDetails={userDetails} />
    </>
  );
};

export default App;
