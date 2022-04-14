import React from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.min.css';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  selectUser: (userId: number) => void;
};

export const TodoList: React.FC<Props> = React.memo(({ todos, selectUser, selectedUserId }) => {
  const [todoTitle, setTodoTitle] = React.useState('');
  const [selectCategory, setSelectCategory] = React.useState('All');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
     setSelectCategory(event.target.value);
  }

   const filteredTodos = React.useMemo(() => {
      return todos
        .filter(todo => (
          todo.title.toLowerCase().includes(todoTitle.toLowerCase())
       ))
        .filter(todo => {
          switch (selectCategory) {
            case 'Active':
              return !todo.completed;

            case 'Completed':
              return todo.completed;

            default:
              return  todos;
          }
        });
    
  }, [todos, todoTitle, selectCategory]);

  return (
    <div className="TodoList">

    <div className="control">
      <input 
        className="input is-hovered" 
        type="text" 
        placeholder="Enter todo's name"
        onChange={event => handleTitleChange(event)}
      />
    </div>

    <div className="select">
      <select
        value={selectCategory}
        onChange={event => handleCategoryChange(event)}
      >
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>
    </div>
    
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {filteredTodos.map((todo: Todo) => (
          <li 
            key={todo.id} 
            className={classNames('TodoList__item', {
              'TodoList__item--checked': todo.completed,
              'TodoList__item--unchecked': !todo.completed,
             })}
           >
          <label>
            <input 
              type="checkbox"
              checked={todo.completed} 
              readOnly 
             />
            <p>{todo.title}</p>
          </label>

          <button
            className={classNames('TodoList__user-button', 'button', {
              'TodoList__user-button--selected': todo.userId === selectedUserId,
             })}


            type="button"
            onClick={() => {
              selectUser(todo.userId)
            }}
          >
            User&nbsp;#{`${todo.userId}`}
          </button>
          </li>
         ))}
      </ul>
    </div>
  </div>
  )
});
