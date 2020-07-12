import React, { useState } from 'react';
import './App.css';
import { getTodosData } from './helpers/api';
import { TodoList } from './components/TodoList';
import { Button } from './components/Button';

const App = () => {
  const reverseArray: number[] = [1, 1, 1, 1];
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [reverseValue, setReverseValue] = useState<number[]>(reverseArray);

  const init = async () => {
    setLoading(true);
    const [tasks, users] = await getTodosData();
    const newTodos = tasks.map(task => ({
      ...task,
      user: users.find(user => user.id === task.userId),
    }));

    setTodos(newTodos);
    setLoading(false);
  };

  const changeReverseValue = (index: number): void => {
    setReverseValue(prev => prev.map((el, ind) => (ind === index ? el * (-1) : el)));
  };

  const sortById = (e: React.MouseEvent) => {
    const index = Number((e.target as Element).id) - 1;

    changeReverseValue(index);
    setTodos(prev => [...prev]
      .sort((a, b) => (a.id - b.id) * reverseValue[index]));
  };

  const sortByName = (e: React.MouseEvent) => {
    const index = Number((e.target as Element).id) - 1;

    changeReverseValue(index);
    setTodos(prev => [...prev]
      .sort((a, b) => (a.user.name.localeCompare(b.user.name)) * reverseValue[index]));
  };

  const sortByTitle = (e: React.MouseEvent) => {
    const index = Number((e.target as Element).id) - 1;

    changeReverseValue(index);
    setTodos(prev => [...prev]
      .sort((a, b) => (a.title.localeCompare(b.title)) * reverseValue[index]));
  };

  const sortByCompleted = (e: React.MouseEvent) => {
    const index = Number((e.target as Element).id) - 1;

    changeReverseValue(index);
    setTodos(prev => [...prev]
      .sort((a, b) => (Number(a.completed) - Number(b.completed)) * reverseValue[index]));
  };

  const FILTER_BUTTONS: FilterButton[] = [
    { id: 1, title: 'Id', func: sortById },
    { id: 2, title: 'Name', func: sortByName },
    { id: 3, title: 'Title', func: sortByTitle },
    { id: 4, title: 'Completed', func: sortByCompleted },
  ];

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {todos.length ? (
        <div>
          <Button filterButtons={FILTER_BUTTONS} />
          <TodoList todos={todos} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => init()}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </>
  );
};

export default App;
