
import React from 'react'
import classNames from 'classnames'

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {changeCompletedStatus, removeTodo, todo} = this.props
        let todoClassName = classNames({ 'todo-completed': todo.isCompleted })
        let todoChangeStatusButtonClassName = classNames({
            'btn btn-primary': true,
            'disabled': todo.isChangingStatus
        })
        let todoRemoveButtonClassName = classNames({
            'btn btn-danger': true,
            'disabled': todo.isRemoving
        })
        return (
            <tr key={todo.id}>
                <td>
                    <span className={todoClassName}>{todo.name}</span>
                </td>
                <td>
                    <button type="button" className={todoChangeStatusButtonClassName}
                        style={{ marginRight: '10px' }}
                        onClick={() => changeCompletedStatus(todo) }>
                        {
                            todo.isChangingStatus ? <span>Loading</span> :
                                <span>{todo.isCompleted ? 'UnComplete' : 'Completed'}</span>
                        }
                    </button>
                    <button type="button" className={todoRemoveButtonClassName}
                        onClick={() => removeTodo(todo) }>
                        {
                            todo.isRemoving ? <span>Removing</span> :
                                <span>Remove</span>
                        }
                    </button>
                </td>
            </tr>
        )
    }
}


