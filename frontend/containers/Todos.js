import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classNames'
import Searchbar from '../components/Searchbar'
import AddTodoModal from '../components/AddTodoModal'
import api from '../common/api'
import TodoLists from '../components/TodoLists'

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
        var updatedTodo = Object.assign({}, selectedTodo, {isCompleted: !selectedTodo.isCompleted})
        api.put('todos', updatedTodo).then(() => {
            selectedTodo.isCompleted = !selectedTodo.isCompleted
            this.setState({
                todos: this.state.todos,
                resultTodos: this.state.resultTodos
            })
        })
    }

    removeTodo(selectedTodo) {
        api.delete('todos', {params: {id: selectedTodo.id}})
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
                case 'All':
                    return true
                case 'Completed':
                    return todo.isCompleted
                case 'UnCompleted':
                    return !todo.isCompleted

                default:
                    return true
            }
        })
        this.setState({
            todos: this.state.todos,
            resultTodos: newTodos
        })
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
        if(!this.state)return <div>Loading...</div>

        let todoListsProps={
            changeCompletedStatus: this.changeCompletedStatus.bind(this),
            removeTodo: this.removeTodo.bind(this),
            searchTodo:this.searchTodo.bind(this),
            saveNewTodo:this.saveNewTodo.bind(this),
            resultTodos:this.state.resultTodos
        }

        return (
           <TodoLists {...todoListsProps}  />
        )
    }
}



export default Todos
