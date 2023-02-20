/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import { Loader } from './components/Loader';
import { Todo, TodoFilterBy } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(TodoFilterBy.NONE);
  const [isLoading, setisLoading] = useState(false);

  const toLowerCase = query.toLowerCase();

  const filteredList = todos.filter(todo => todo.title.toLowerCase()
    .includes(toLowerCase)).filter(todo => {
    switch (filter) {
      case TodoFilterBy.ACTIVE:
        return !todo.completed;
      case TodoFilterBy.COMPLETED:
        return todo.completed;
      default:
        return todo;
    }
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setisLoading(true));
  }, []);

  const selectedTodo = todos.find(x => x.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
                filter={filter}
                query={query}
              />
            </div>

            <div className="block">
              {!isLoading && <Loader />}

              <TodoList
                todos={filteredList}
                selectedTodoId={selectedTodoId}
                selectTodo={(todoID) => {
                  setSelectedTodoId(todoID);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          selectTodo={(todoID) => {
            setSelectedTodoId(todoID);
          }}
        />
      )}
    </>
  );
};
