import React, { useState, FC, useMemo } from 'react';
import { PreparedTodo } from './types';
import { TodoList } from './components/TodoList/TodoList';
import { getPreparedTodos } from './helpers_api'
import './App.css';

export const App: FC = () => {
  const [todos, setTodos] = useState<PreparedTodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [selectedSort, setSelectedSort] = useState('choose');

  const showedAllTodos = async () => {
    setIsLoading(true);

    const todosFromApi = await getPreparedTodos();

    setTodos(todosFromApi);
    setIsLoading(false);
    setLoaded(true);

  }

  const sorted = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: typeOfSort } = event.target;
    setSelectedSort(typeOfSort);
  }

  const sortedTodos = useMemo(() => {
    return selectedSort === 'initual'
        ? [...todos]
        : [...todos].sort((aTodo, bTodo) => {
          switch(selectedSort) {
            case 'title':
              return aTodo.title.localeCompare(bTodo.title);
            case 'name':
              return aTodo.user && bTodo.user ? aTodo.user.name.localeCompare(bTodo.user.name) : 0;
            case 'completed':
              return Number(aTodo.completed) - Number(bTodo.completed);
            default:
            return 0;
          }
        })

  }, [todos, selectedSort]);


  if (isLoading) {
    return (
      <p className="loading">
      Loading...
      </p>
    );
  }

  return (
    <div className="app">
      <h1 className="title">Dynamic list of TODOs</h1>
      {(
        !isLoaded
        ? (
            <>
              <p className="initual_loading">
                Load your Todos
              </p>
              <button
                type="button"
                className="loading_button"
                onClick={showedAllTodos}
              >
                Load
              </button>
            </>
           )
          : (
            <>
              <select value={selectedSort}
                onChange={sorted}
                className="selected_button"
              >
                <option disabled value='choose'>Choose sort method</option>
                <option value='initual'>Initual view</option>
                <option value='title'>Title</option>
                <option value='name'>Name</option>
                <option value='completed'>Completed</option>
              </select>
              <table className="table">
                <thead>
                  <tr className="table__title">
                    <th className="table__cell">User</th>
                    <th className="table__cell">Todo</th>
                    <th className="table__cell">Status</th>
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
    )
  };
