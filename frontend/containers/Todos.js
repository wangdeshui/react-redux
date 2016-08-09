import React, { Component } from 'react'
import TodoLists from '../components/TodoLists'
import {fetchTodos, showAddTodoModal, hideAddTodoModal, changeTodoStatus, removeTodo, addTodo, searchTodos} from '../redux/actions'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items,
        resultTodos: state.todos.resultTodos,
        isLoading: state.todos.isLoading,
        isAddingTodo: state.todos.isAddingTodo,
        isShowingAddTodoModal: state.todos.isShowingAddTodoModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => dispatch(fetchTodos()),
        showAddTodoModal: () => dispatch(showAddTodoModal()),
        hideAddTodoModal: () => dispatch(hideAddTodoModal()),
        removeTodo: (todo) => dispatch(removeTodo(todo)),
        addTodo: (todo) => dispatch(addTodo(todo)),
        searchTodos: (filter) => dispatch(searchTodos(filter)),
        changeCompletedStatus: (todo) => dispatch(changeTodoStatus(todo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists)