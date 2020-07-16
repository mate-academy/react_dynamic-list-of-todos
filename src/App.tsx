import React, { FC, useState } from 'react';
import { TodosWithUser } from './interfaces';
import { getPrepearedTodos } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import { Buttons } from './components/Buttons/Buttons';
import './App.css';

const App: FC = () => {
  const [todoList, setTodoList] = useState<TodosWithUser[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    await getPrepearedTodos().then(data => setTodoList(data));
    setLoading(false);
  };

  const getNewData = (title: string, data: TodosWithUser[]): TodosWithUser[] => {
    switch (title) {
      case 'Sort by title':
        return [...data].sort((todoA, todoB) => todoA.title.localeCompare(todoB.title));
      case 'Sort by completed':
        return [...data].sort((todoA, todoB) => Number(todoB.completed) - Number(todoA.completed));
      default:
        return [...data].sort((todoA, todoB) => todoA.user.name.localeCompare(todoB.user.name));
    }
  };

  const handleFilter = (title: string) => {
    setLoading(true);

    const newList = getNewData(title, todoList);

    setTodoList(newList);
    setLoading(false);
  };

  return (
    <div className="heading">
      <h1>Dynamic list of TODOs</h1>
      <p>
        <span>Todos: </span>
        {todoList.length}
      </p>
      {!todoList.length
        ? (
          <button
            type="button"
            onClick={getList}
            disabled={isLoading}
          >
            {isLoading ? 'loading' : 'Load'}
          </button>
        )
        : <Buttons onFilter={handleFilter} />}

      <TodoList todos={todoList} />
    </div>
  );
};

export default App;
