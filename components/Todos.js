import React, { Component } from 'react'
import _ from 'lodash'

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

    }

    changeCompletedStatus(selectedTodo) {
        let {todos} = this.state
        todos.forEach(todo => {
            if (todo.id == selectedTodo.id) {
                todo.isCompleted = !todo.isCompleted
            }
        })


        this.setState({ todos: todos })
    }

    removeTodo(selectedTodo) {
        _.remove(this.state.todos, todo => {
            return todo.id === selectedTodo.id
        })
        this.setState({
            todos: this.state.todos
        })
    }

    renderTodo(todo) {
        return (
            <tr key={todo.id}>
                <td>{todo.name}</td>
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

    render() {
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    {this.state.todos.map(todo => this.renderTodo(todo)) }
                </tbody>
            </table>
        )
    }

}

export default Todos
