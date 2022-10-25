import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setVisibleTodos(todosFromServer);
  };

  const handleSelectTodo = (todo: Todo | null) => {
    if (!todo) {
      setSelectedTodoId(0);
    } else {
      setSelectedTodoId(todo.id);
    }

    setSelectedTodo(todo);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                onVisible={(visible: Todo[]) => setVisibleTodos(visible)}
              />
            </div>

            <div className="block">
              {(todos.length > 0)
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedId={selectedTodoId}
                    onSelect={handleSelectTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelect={handleSelectTodo}
        />
      )}
    </>
  );
};
