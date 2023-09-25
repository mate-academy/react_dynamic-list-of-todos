import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterOption } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [input, setInput] = useState('');
  const [task, setTask] = useState<Todo>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                input={input}
                setInput={setInput}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                todos.length > 0 && (
                  <TodoList
                    todos={todos}
                    selectedFilter={selectedFilter}
                    input={input}
                    setTask={setTask}
                    task={task}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {task && (
        <TodoModal
          task={task}
          setTask={() => setTask(undefined)}
        />
      )}
    </>
  );
};
