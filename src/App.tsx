import React, { useState, useMemo } from 'react';
import { PreparedTodo } from './interfaces';
import { TodoList } from './components/TodoList';
import { getPreparedTodos } from './components/todos-service';
import './App.css';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<PreparedTodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [selectedSort, setSelectedSort] = useState('choose');

  const showAllTodos = async () => {
    setIsLoading(true);

    const todosFromApi = await getPreparedTodos();

    setTodos(todosFromApi);
    setIsLoading(false);
    setLoaded(true);
  };

  const sorted = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: typeOfSort } = event.target;

    setSelectedSort(typeOfSort);
  };

  const sortedTodos = useMemo(() => {
    return selectedSort === 'initual'
      ? [...todos]
      : [...todos].sort((aTodo, bTodo) => {
        switch (selectedSort) {
          case 'title':
            return aTodo.title.localeCompare(bTodo.title);
          case 'name':
            return aTodo.user && bTodo.user ? aTodo.user.name.localeCompare(bTodo.user.name) : 0;
          case 'completed':
            return Number(aTodo.completed) - Number(bTodo.completed);
          default:
            return 0;
        }
      });
  }, [todos, selectedSort]);


  if (isLoading) {
    return (
      <p className="loading">
        Loading...
      </p>
    );
  }

  return (
    <div className="container">
      <h1 className="title text-center mt-5">Dynamic list of TODOs</h1>
      {(
        !isLoaded
          ? (
            <>
              <button
                type="button"
                className="btn btn-success"
                onClick={showAllTodos}
              >
                Load Todos
              </button>
            </>
          )
          : (
            <>
              <select
                value={selectedSort}
                onChange={sorted}
                className="custom-select my-3"
              >
                <option disabled value="choose">Choose sort</option>
                <option value="initual">Initual view</option>
                <option value="title">Title</option>
                <option value="name">Name</option>
                <option value="completed">Completed</option>
              </select>
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Todo</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <TodoList todosList={sortedTodos} />
                </tbody>
              </table>
            </>
          )
      )}
    </div>
  );
};
