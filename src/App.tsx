/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedValue, setSelectedValue] = useState('all');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetch(`
      https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json`)
      .then(response => response.json())
      .then((todosFromServer: Todo[]) => {
        switch (selectedValue) {
          case 'all':
            setTodos(
              todosFromServer.filter(todo =>
                todo.title.toLowerCase().includes(inputValue.toLowerCase()),
              ),
            );
            break;
          case 'active':
            setTodos(
              todosFromServer.filter(
                todo =>
                  !todo.completed &&
                  todo.title.toLowerCase().includes(inputValue.toLowerCase()),
              ),
            );
            break;
          case 'completed':
            setTodos(
              todosFromServer.filter(
                todo =>
                  todo.completed &&
                  todo.title.toLowerCase().includes(inputValue.toLowerCase()),
              ),
            );
            break;
          default:
            return;
        }
      });
  }, [selectedValue, inputValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
