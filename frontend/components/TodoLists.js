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
        let {searchTodo, resultTodos, saveNewTodo, changeCompletedStatus, removeTodo} = this.props
        if (!resultTodos) return <div>Loading...</div>

        return (<div>
            <div className='row'>
                <div className='col-sm-10'>
                    <Searchbar searchTodo={searchTodo}/>
                </div>
                <div className='col-sm-2'>
                    <button className='btn btn-primary' onClick={() => this.refs.addTodoModal.show() }>
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

                    {resultTodos.map(todoItem => <TodoItem key={todoItem.id} todo={todoItem}/>) }
                </tbody>
            </table>

            <AddTodoModal saveNewTodo={saveNewTodo } ref='addTodoModal'/>
        </div>)
    }
}