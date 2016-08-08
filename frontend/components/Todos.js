import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classNames'
import Searchbar from './Searchbar'
import AddTodoModal from './AddTodoModal'
import api from '../common/api'

class Todos extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        api.get('todos').then(todos => {
            var state = {
                todos: todos,
                resultTodos: Object.assign([], todos)
            }
            this.setState(state)
        })
    }

    changeCompletedStatus(selectedTodo) {
        var updatedTodo = Object.assign({}, selectedTodo, { isCompleted: !selectedTodo.isCompleted })
        api.put('todos', updatedTodo).then(() => {
            selectedTodo.isCompleted = !selectedTodo.isCompleted
            this.setState({
                todos: this.state.todos,
                resultTodos: this.state.resultTodos
            })
        })
    }

    removeTodo(selectedTodo) {
        api.delete('todos', { params: { id: selectedTodo.id } })
            .then(() => {
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
        let maxTodo = _.maxBy(this.state.todos, 'id')
        let newTodo = {
            id: maxTodo ? maxTodo.id + 1 : 1,
            name,
            isCompleted: false
        }

        api.post('todos', newTodo).then(() => {
            this.state.todos.push(newTodo)
            this.state.resultTodos.push(newTodo)
            this.setState({
                todos: this.state.todos,
                resultTodos: this.state.resultTodos
            })
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
                        {this.state ? this.state.resultTodos.map(todo => this.renderTodo(todo)) : null }
                    </tbody>
                </table>

                <AddTodoModal saveNewTodo={this.saveNewTodo.bind(this) } ref='addTodoModal'/>
            </div>
        )
    }

}

export default Todos
