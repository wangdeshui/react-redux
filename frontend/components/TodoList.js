import React, { Component } from 'react'
import Searchbar from './Searchbar'
import AddTodoModal from './AddTodoModal'
import Todo from './Todo'

export default class TodoList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchTodos()
    }

    render() {
        let {isLoading, resultTodos, searchTodo, saveNewTodo, changeTodoCompletedStatus, removeTodo} = this.props
        let getTodoProps = (todo) => ({ todo, changeTodoCompletedStatus, removeTodo })
        if (isLoading) return <div>Loading...</div>

        return (
            <div>
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
                        {resultTodos.map(todo => <Todo {...getTodoProps(todo) }/>) }
                    </tbody>
                </table>

                <AddTodoModal saveNewTodo={saveNewTodo} ref='addTodoModal'/>
            </div>
        )
    }

}
