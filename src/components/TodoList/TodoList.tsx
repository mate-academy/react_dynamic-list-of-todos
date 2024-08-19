import React, { Dispatch, SetStateAction, useContext } from 'react';
import { FilteredTodosContext, FirtsLoadedContext, GetTodoContext, TodosContext } from '../../store';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  setIsOpenedPost: Dispatch<SetStateAction<boolean>>,
}

export const TodoList: React.FC<Props> = ({ setIsOpenedPost }) => {
  const { todos } = useContext(TodosContext);
  const { todo, setTodo } = useContext(GetTodoContext);
  const { filteredTodos } = useContext(FilteredTodosContext);
  const { firtsLoadedPage } = useContext(FirtsLoadedContext);

  console.log(firtsLoadedPage);
  

  const arrayOfTodos = firtsLoadedPage ? todos : filteredTodos;

  const getInfoAboutPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: Todo) => {
    e.preventDefault();
    setIsOpenedPost(true);
    setTodo(todo);
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {
          arrayOfTodos && arrayOfTodos.map(FilteredTodo => (
            <tr
              data-cy="todo"
              className={cn({ "has-background-info-light": FilteredTodo.id === todo?.id })}
              key={FilteredTodo.id}
            >
              <td className="is-vcentered">{FilteredTodo.id}</td>
              <td className="is-vcentered">
                {FilteredTodo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn("has-text-success", { "has-text-danger": !FilteredTodo.completed })}
                >
                  {FilteredTodo.title}

                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={(e) => getInfoAboutPost(e, FilteredTodo)}
                >
                  <span className="icon">
                    <i className={cn("far", {
                      "fa-eye" : todo?.id !== FilteredTodo.id,
                      "fa-eye-slash": todo?.id === FilteredTodo.id
                    })} />
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
