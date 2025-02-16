/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from "react";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import { Todo } from "./types/Todo";
import { TodoModal } from "./components/TodoModal";
import { Loader } from "./components/Loader";
import { getTodos } from "./api";
import { Completed } from "./types/Filters";

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [completedFilter, setCompletedFilter] = useState<Completed>(
    Completed.All,
  );

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    switch (completedFilter) {
      case Completed.Active:
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      case Completed.Completed:
        filtered = filtered.filter((todo) => todo.completed);
        break;
      case Completed.All:
        break;
      default:
        break;
    }

    if (searchQuery) {
      const search = searchQuery.toLowerCase();

      filtered = filtered.filter((todo) => {
        const title = todo.title.toLowerCase();

        return title.includes(search);
      });
    }

    return filtered;
  }, [completedFilter, searchQuery, todos]);

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleOpen = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={setSearchQuery}
                onCompleted={setCompletedFilter}
                value={searchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onOpen={handleOpen}
                  selectedTodoId={selectedTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={handleClose} />}
    </>
  );
};
