/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
// import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [field, setField] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // const [seletedUser, setSelectedUser] = useState<User | null>(null);

  async function getTodoses() {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  }

  useEffect(() => {
    getTodoses();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (field) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  }).filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const findSelectedTodo = (todo:Todo) => {
    setSelectedTodo(todo);
  };

  const reserQuery = () => {
    setQuery('');
  };

  const resetSelectedTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setField={setField}
                resetQuery={reserQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
                findSelectedTodo={findSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          resetSelectedTodo={resetSelectedTodo}
        />
      )}
    </>
  );
};
