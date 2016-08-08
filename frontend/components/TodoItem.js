
import React from 'react'
import classNames from 'classnames'

export default class TodoItem extends React.Component{
   constructor(props)
   {
       super(props)
   }

    render(){

        let {changeCompletedStatus,removeTodo,todo}=this.props
        let todoClassName = classNames({ 'todo-completed': todo.isCompleted })

        return (
            <tr key={todo.id}>
                <td>
                    <span className={todoClassName}>{todo.name}</span>
                </td>
                <td>
                    <button type="button" className="btn btn-primary"
                            style={{ marginRight: '10px' }}
                            onClick={() =>changeCompletedStatus(todo) }>
                        {todo.isCompleted ? 'UnComplete' : 'Completed'}
                    </button>
                    <button type="button" className="btn btn-danger"
                            onClick={() =>removeTodo(todo) }>
                        Remove
                    </button>
                </td>
            </tr>
        )
    }
}


