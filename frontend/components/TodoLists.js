import Searchbar from './Searchbar'
import TodoItem from './TodoItem'
import React from 'react'
import AddTodoModal from './AddTodoModal'

export default class TodoLists extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchTodos()
    }

    render() {
        let {searchTodos,
            resultTodos, saveNewTodo,
            changeCompletedStatus, removeTodo,
            showAddTodoModal, hideAddTodoModal,
            isShowingAddTodoModal,
            todos,
            isAddingTodo,
            addTodo
        } = this.props

        if (!resultTodos) return <div>Loading...</div>

        return (<div>
            <div className='row'>
                <div className='col-sm-10'>
                    <Searchbar searchTodos={searchTodos}/>
                </div>
                <div className='col-sm-2'>
                    <button className='btn btn-primary' onClick={showAddTodoModal}>
                        Add
                    </button>
                </div>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>

                    {resultTodos.map(todoItem => <TodoItem key={todoItem.id} todo={todoItem}
                     changeCompletedStatus={changeCompletedStatus} removeTodo={removeTodo}/>) }
                </tbody>
            </table>

            <AddTodoModal isShowing={isShowingAddTodoModal} addTodo={addTodo} 
            hideAddTodoModal={hideAddTodoModal} isAddingTodo={isAddingTodo} todos={todos}/>
        </div>)
    }
}