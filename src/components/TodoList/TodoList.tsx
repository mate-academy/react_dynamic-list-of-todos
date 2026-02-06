import React, { useContext, useState} from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/todocontext';

export const TodoList: React.FC = () => {
  const [todoEyeSelected, setTodoEyeSelected] = useState<number | null>(null)
  const context = useContext(TodoContext)
  const {filtred, handleIsLoading, handleModalClick, handleGetTodoId, handleUserId, showModal, todoId} = context

  console.log('filtred', filtred)



const handleSelectEye = (eye: number) => {
  setTodoEyeSelected(eye)
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
           {filtred.map((f) =>
          <tr data-cy="todo" key={f.id } className="">
            <td className="is-vcentered">{f.id }</td>
               <td className="is-vcentered">
                 <span className='icon' data-cy="iconCompleted">
                   <i className={classNames("fas", {"fa-check": f.completed === true})}></i>
               </span>
                 </td>
               <td className="is-vcentered is-expanded">

                 <p className={classNames({
                   "has-text-danger": f.completed === false
                 },
              {"has-text-success": f.completed === true}
           )}>{f.title}</p>
        </td>
        <td className="has-text-right is-vcentered">
                 <button data-cy="selectButton" className="button" type="button" onClick={() => { handleIsLoading(true); handleModalClick(false); handleGetTodoId(f.id); handleUserId(f.userId);  handleSelectEye(f.id)}}>
            <span className="icon" >
                     <i className={classNames("far",  {
                       "fa-eye": todoEyeSelected !== f.id || showModal, // se o olho que eu clicar tiver o id igual da tarefa(false)
                        "fa-eye-slash": todoEyeSelected === f.id && !showModal,
              })} />
            </span>
          </button>
        </td>
      </tr>
        )}
    </tbody>
  </table>


  )

}

;
