/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterInstructions } from './types/FilterInstructions';
import { TodosType } from './types/TodosType';
import { TodoModal } from './components/TodoModal';

const getPreparedTodos = (
  todosList: Todo[],
  filterInstruction: FilterInstructions,
) => {
  return todosList.filter(todo => {
    const containsSubstringInName = todo.title
      .toLowerCase()
      .includes(filterInstruction.todoName.toLowerCase());

    if (filterInstruction.todosType === TodosType.Active) {
      return !todo.completed && containsSubstringInName;
    }

    if (filterInstruction.todosType === TodosType.Completed) {
      return todo.completed && containsSubstringInName;
    }

    return containsSubstringInName;
  });
};

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [chosenTodo, setchosenTodo] = useState<Todo | null>(null);

  const [filterInstructions, setFilterInstructions] =
    useState<FilterInstructions>({
      todosType: TodosType.All,
      todoName: '',
    });

  useEffect(() => {
    getTodos().then(setTodoList);
  }, []);

  const handleChoosingTodo = (todo: Todo | null) => {
    setchosenTodo(todo);
  };

  const handleFilterChange = (
    newValue: TodosType | string,
    fieldName: string,
  ) => {
    setFilterInstructions(prevState => ({
      ...prevState,
      [fieldName]:
        typeof newValue === 'string' ? newValue.trimStart() : newValue,
    }));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterInstructions={filterInstructions}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {todoList.length ? (
                <TodoList
                  chosenTodoId={chosenTodo?.id}
                  onChoosingTodo={handleChoosingTodo}
                  todos={getPreparedTodos(todoList, filterInstructions)}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {chosenTodo && (
        <TodoModal
          onChoosingTodo={handleChoosingTodo}
          chosenTodo={chosenTodo}
        />
      )}
    </>
  );
};
