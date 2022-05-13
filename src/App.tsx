import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [
    selectedTodoId,
    setSelectedTodoId,
  ] = useState(0);

  const [
    todos,
    setTodos] = useState<Todo[]>([]);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState('');

  const [
    status,
    setStatus,
  ] = useState('all');

  const selectUser = (userId: number, id: number) => {
    setSelectedUserId(userId);
    setSelectedTodoId(id);
  };

  const clearUser = () => {
    setSelectedUserId(0);
    setSelectedTodoId(0);
  };

  const updateSearchQuery = (query: string) => {
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }
  };

  const updateStatus = (todoStatus: string) => {
    setStatus(todoStatus);
  };

  const randomizeTodos = () => {
    const randomizedTodos = [];
    const helperArray = [...todos];

    while (helperArray.length > 0) {
      const currentTodoIndex
        = Math.round(Math.random() * (helperArray.length - 1));
      const currentTodo = helperArray.splice(currentTodoIndex, 1);

      randomizedTodos.push(currentTodo[0]);
    }

    setTodos(randomizedTodos);
  };

  const filterByStatus = (receivedStatus: string) => {
    switch (receivedStatus) {
      case 'active':
        return todos.filter(todo => todo.completed === false);
      case 'completed':
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const filterByQuery = (todosArr: Todo[], query: string) => {
    if (!query) {
      return [...todosArr];
    }

    return todosArr.filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()));
  };

  const getVisibleTodos = () => {
    return filterByQuery(filterByStatus(status), searchQuery);
  };

  useEffect(() => {
    getTodos().then(result => {
      setTodos(result);
    });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          userSelected={selectUser}
          filterTodosList={updateSearchQuery}
          filterTodosByStatus={updateStatus}
          randomizeTodosList={randomizeTodos}
          displayedTodos={getVisibleTodos()}
          currentTodoId={selectedTodoId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clear={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
