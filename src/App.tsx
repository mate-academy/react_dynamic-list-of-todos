import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterOption, SelectedId } from './types/variables';
import { FilterCallback } from './types/functions';

const doesTodoMeetQuery = (todo: Todo, query: string) => {
  return todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
};

const getFilterOptionCallback = (
  query: string,
  option: FilterOption,
): FilterCallback => {
  switch (option) {
    case FilterOption.All:
      return (todo: Todo) => doesTodoMeetQuery(todo, query);
    case FilterOption.Active:
      return (todo: Todo) => !todo.completed && doesTodoMeetQuery(todo, query);
    case FilterOption.Completed:
      return (todo: Todo) => todo.completed && doesTodoMeetQuery(todo, query);
    default:
      throw new Error('Filter option is not valid!!!');
  }
};

const getTodoById = (todos: Todo[], id: number): Todo | null => {
  const foundTodo = todos?.find(todo => todo.id === id);

  return foundTodo ? foundTodo : null;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<SelectedId>(null);
  const [filterOption, setFilterOption] = useState<FilterOption>(
    FilterOption.All,
  );
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    getTodos().then(loadedTodos => setTodos(loadedTodos));
  }, []);

  const onTodoSelect = (id: SelectedId) => {
    setSelectedTodoId(id);
  };

  const onFilterSelect = (option: FilterOption) => {
    if (option !== filterOption) {
      setFilterOption(option);
    }
  };

  const onFilterChange = (query: string) => {
    if (query !== filterQuery) {
      setFilterQuery(query);
    }
  };

  const selectedTodo = useMemo(
    () => (todos && selectedTodoId ? getTodoById(todos, selectedTodoId) : null),
    [todos, selectedTodoId],
  );

  const filteredTodos = useMemo(
    () => todos?.filter(getFilterOptionCallback(filterQuery, filterOption)),
    [todos, filterQuery, filterOption],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterOption={filterOption}
                onFilterSelect={onFilterSelect}
                onFilterChange={onFilterChange}
              />
            </div>

            <div className="block">
              {filteredTodos ? (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onTodoSelect={onTodoSelect}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onTodoSelect={onTodoSelect} />
      )}
    </>
  );
};
