import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classNames'
import Searchbar from './Searchbar'
import AddTodoModal from './AddTodoModal'

class Todos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [
                {
                    id: 1,
                    name: 'Todo React',
                    isCompleted: false
                }, {
                    id: 2,
                    name: 'Todo Redux',
                    isCompleted: false
                }]
        }
        this.state.resultTodos = Object.assign([], this.state.todos)
    }

    changeCompletedStatus(selectedTodo) {
        selectedTodo.isCompleted = !selectedTodo.isCompleted
        _.find(this.state.todos, todo => todo.id === selectedTodo.id).isCompleted = selectedTodo.isCompleted
        this.setState({
            todos: this.state.todos,
            resultTodos: this.state.resultTodos
        })
    }

    removeTodo(selectedTodo) {
        _.remove(this.state.resultTodos, todo => {
            return todo.id === selectedTodo.id
        })
        _.remove(this.state.todos, todo => {
            return todo.id === selectedTodo.id
        })

        this.setState({
            todos: this.state.todos,
            resultTodos: this.state.resultTodos
        })
    }

    searchTodo(keyword, status) {
        keyword = keyword.toLowerCase()
        let newTodos = _.filter(this.state.todos, todo => {

            if (todo.name.toLowerCase().indexOf(keyword) === -1) return false

            switch (status) {
                case 'All': return true
                case 'Completed': return todo.isCompleted
                case 'UnCompleted': return !todo.isCompleted

                default:
                    return true
            }
        })
        this.setState({
            todos: this.state.todos,
            resultTodos: newTodos
        })
    }

    renderTodo(todo) {
        let todoClassName = classNames({ 'todo-completed': todo.isCompleted })

        return (
            <tr key={todo.id}>
                <td>
                    <span className={todoClassName}>{todo.name}</span>
                </td>
                <td>
                    <button type="button" className="btn btn-primary"
                        style={{ marginRight: '10px' }}
                        onClick={() => this.changeCompletedStatus(todo) }>
                        {todo.isCompleted ? 'UnComplete' : 'Completed'}
                    </button>
                    <button type="button" className="btn btn-danger"
                        onClick={() => this.removeTodo(todo) }>
                        Remove
                    </button>
                </td>
            </tr>
        )
    }

    saveNewTodo(name) {
        let newTodo = {
            id: _.maxBy(this.state.todos, 'id').id + 1,
            name,
            isCompleted: false
        }

        this.state.todos.push(newTodo)
        this.state.resultTodos.push(newTodo)

        this.setState({
            todos: this.state.todos,
            resultTodos: this.state.resultTodos
        })
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-sm-10'>
                        <Searchbar searchTodo={this.searchTodo.bind(this) }/>
                    </div>
                    <div className='col-sm-2'>
                        <button className='btn btn-primary' onClick={() => this.refs.addTodoModal.show()}>
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
                        {this.state.resultTodos.map(todo => this.renderTodo(todo)) }
                    </tbody>
                </table>

                <AddTodoModal saveNewTodo={this.saveNewTodo.bind(this) } ref='addTodoModal'/>
            </div>
        )
    }

}

export default Todos
