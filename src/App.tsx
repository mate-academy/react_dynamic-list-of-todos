/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from "react";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import { Todo } from "./types/Todo";
import { getTodos, getUser } from "./api";
import { Loader } from "./components/Loader";
import { TodoModal } from "./components/TodoModal";
import { User } from "./types/User";

export const SortFieldEnum = {
  COMPLETED: "completed",
  ACTIVE: "active",
  NONE: "",
};

type FilterArgs = {
  searchField: string;
  sortField: (typeof SortFieldEnum)[keyof typeof SortFieldEnum];
};

function filteredTodos(todos: Todo[], { searchField, sortField }: FilterArgs) {
  let visibleFilteredTodos = [...todos];

  if (searchField) {
    const searchFieldNormalize = searchField.toLowerCase().trim();

    visibleFilteredTodos = visibleFilteredTodos.filter((todo) => {
      return todo.title.toLowerCase().trim().includes(searchFieldNormalize);
    });
  }

  if (sortField) {
    visibleFilteredTodos = visibleFilteredTodos.filter((todo) => {
      switch (sortField) {
        case SortFieldEnum.ACTIVE:
          return !todo.completed;
        case SortFieldEnum.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });
  }

  return visibleFilteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodo, setVisibleTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleUser, setVisibleUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [sortField, setSortField] =
    useState<(typeof SortFieldEnum)[keyof typeof SortFieldEnum]>("");

  const getUserById = (userId: number) => {
    setIsLoadingUser(true);
    getUser(userId)
      .then((user) => setVisibleUser(user))
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => setIsLoadingUser(false));
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((todo) => setTodos(todo))
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateTodo = (todo: Todo) => {
    setVisibleTodo(todo);
  };

  const updateSearchField = (str: string) => {
    setSearchField(str);
  };

  const updateSortField = (
    str: (typeof SortFieldEnum)[keyof typeof SortFieldEnum]
  ) => {
    setSortField(str);
  };

  const visibleTodos = filteredTodos(todos, { searchField, sortField });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                updateSearchField={updateSearchField}
                searchField={searchField}
                updateSortField={updateSortField}
                sortField={sortField}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  toggleModal={toggleModal}
                  isModalOpen={isModalOpen}
                  updateTodo={updateTodo}
                  getUserById={getUserById}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          toggleModal={toggleModal}
          todo={visibleTodo}
          user={visibleUser}
          isLoadingUser={isLoadingUser}
        />
      )}
    </>
  );
};
