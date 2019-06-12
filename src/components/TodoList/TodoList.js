import React from 'react';
import TodoItem from './TodoItem/TodoItem';
import './TodoList.css';

function TodoList(props) {
  const getButtonAttributes = (isLoading) => {
    return {
      ...(isLoading === true
        ? {
          className: 'load-button disabled',
          value: 'Loading...'
        } : {
          className: 'load-button',
          value: 'Load data'
        }
      ),
      disabled: !!isLoading
    }
  };

  const getStatesContent = (loaded) => {
    if (loaded === true) {
      return props.todosData.map(item =>
        (<TodoItem {...item} key={item.id} onToggleCompleted={props.handleCompletedChange}/>)
      );
    } else {
      const {
        className,
        disabled,
        value,
      } = getButtonAttributes(loaded !== null);

      return (
        <button
          className={className}
          disabled={disabled}
          onClick={props.loadDataClick}
        >{value}
        </button>
      );
    }
  };

  const content = getStatesContent(props.loaded);
  return (
    <section className='container'>
      {content}
    </section>
  );
}

export default TodoList;
