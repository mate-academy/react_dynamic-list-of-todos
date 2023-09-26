import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo) => void,
}

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  setSelectedTodo = () => {},
}) => {
  const isSelected = todo.id === selectedTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isSelected })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': todo.completed,
          'has-text-danger': !todo.completed,
        })}
        >
          {todo.title}
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
            <i className={classNames({
              'far fa-eye': !isSelected,
              'far fa-eye-slash': isSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

// fas fa-check
// far fa-eye-slash
// far fa-eye

// <tr data-cy="todo" className="has-background-info-light">
//         <td className="is-vcentered">2</td>
//         <td className="is-vcentered" />
//         <td className="is-vcentered is-expanded">
//           <p className="has-text-danger">quis ut nam facilis et officia qui</p>
//         </td>
//         <td className="has-text-right is-vcentered">
//           <button data-cy="selectButton" className="button" type="button">
//             <span className="icon">
//               <i className="far fa-eye-slash" />
//             </span>
//           </button>
//         </td>
//       </tr>

//       <tr data-cy="todo" className="">
//         <td className="is-vcentered">1</td>
//         <td className="is-vcentered" />
//         <td className="is-vcentered is-expanded">
//           <p className="has-text-danger">delectus aut autem</p>
//         </td>
//         <td className="has-text-right is-vcentered">
//           <button data-cy="selectButton" className="button" type="button">
//             <span className="icon">
//               <i className="far fa-eye" />
//             </span>
//           </button>
//         </td>
//       </tr>

//       <tr data-cy="todo" className="">
//         <td className="is-vcentered">6</td>
//         <td className="is-vcentered" />
//         <td className="is-vcentered is-expanded">
//           <p className="has-text-danger">
//             qui ullam ratione quibusdam voluptatem quia omnis
//           </p>
//         </td>
//         <td className="has-text-right is-vcentered">
//           <button data-cy="selectButton" className="button" type="button">
//             <span className="icon">
//               <i className="far fa-eye" />
//             </span>
//           </button>
//         </td>
//       </tr>

//       <tr data-cy="todo" className="">
//         <td className="is-vcentered">8</td>
//         <td className="is-vcentered">
//           <span className="icon" data-cy="iconCompleted">
//             <i className="fas fa-check" />
//           </span>
//         </td>
//         <td className="is-vcentered is-expanded">
//           <p className="has-text-success">quo adipisci enim quam ut ab</p>
//         </td>
//         <td className="has-text-right is-vcentered">
//           <button data-cy="selectButton" className="button" type="button">
//             <span className="icon">
//               <i className="far fa-eye" />
//             </span>
//           </button>
//         </td>
//       </tr>
