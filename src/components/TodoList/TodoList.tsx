import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({ 
  todos,
  selectedTodo,
  setSelectedTodo
}) => {

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
      { todos.length > 0 ?
         todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{`${todo.id}`}</td>
          <td className="is-vcentered">
          {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p 
              className={cn({
                "has-text-danger": todo.completed === false,
                "has-text-success": todo.completed === true
              })}
            >
                {`${todo.title}`}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button 
              data-cy="selectButton"
              className="button" 
              type="button"
              onClick={() => setSelectedTodo(todo)}
            >
              <span className="icon">
                <i className={cn("far", {
                    "fa-eye-slash": selectedTodo?.id === todo.id,
                    "fa-eye": selectedTodo?.id !== todo.id,
                    }
                  )} 
                />
              </span>
            </button>
          </td>
        </tr>
        
        )) : (
          <td style={({textAlign: "center"})}>Nenhum resultado encontrado!</td>
        )
      }
    </tbody>
  </table>
  )
};
