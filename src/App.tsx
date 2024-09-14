import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter, State, Todo } from './types/Todo';
import { getTodos } from './api';

const filterTasks = (tasks: Todo[], filter: Filter): Todo[] => {
  return tasks.filter(task => {
    const matchesState =
      filter.state === State.All ||
      (filter.state === State.Active && !task.completed) ||
      (filter.state === State.Completed && task.completed);

    const matchesQuery = filter.query
      ? task.title.toLowerCase().includes(filter.query.toLowerCase())
      : true;

    return matchesState && matchesQuery;
  });
};

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>({ state: State.All, query: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  const handleFilterChange = (state: State, query: string) => {
    setFilter({ state, query });
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTasks)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filter),
    [tasks, filter],
  );

  const handleTaskSelection = (task: Todo) => {
    setSelectedTask(task);
  };

  const handleTaskDeselection = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Tasks:</h1>

            <div className="block">
              <TodoFilter
                query={filter.query}
                state={filter.state}
                onStateChanged={state =>
                  handleFilterChange(state, filter.query)
                }
                onQueryChanged={query =>
                  handleFilterChange(filter.state, query)
                }
              />
            </div>

            <div className="block">
              {isLoading && !selectedTask && <Loader />}
              {!isLoading && filteredTasks.length > 0 && (
                <TodoList
                  tasks={filteredTasks}
                  onShowTodoDetail={handleTaskSelection}
                  selectedTask={selectedTask}
                />
              )}
              {!isLoading && filteredTasks.length === 0 && (
                <p>No tasks available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTask && (
        <TodoModal
          task={selectedTask}
          onCloseTaskModal={handleTaskDeselection}
        />
      )}
    </>
  );
};
