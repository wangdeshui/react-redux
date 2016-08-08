import React, { Component } from 'react'
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import {
    fetchTodos,
    receiveTodos,
    removeTodo,
    searchTodo,
    saveNewTodo,
    showAddTodoModal,
    hideAddTodoModal,
    changeTodoCompletedStatus
} from '../actions'

const mapStateToProps = (state) => {
    return {
        todos: state.todoList.todos,
        resultTodos: state.todoList.resultTodos,
        isLoading: state.todoList.isLoading,
        isShowingAddTodoModal: state.todoList.isShowingAddTodoModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => {
            dispatch(fetchTodos())
        },
        changeTodoCompletedStatus: (id) => {
            dispatch(changeTodoCompletedStatus(id))
        },
        searchTodo: (keyword) => {
            dispatch(searchTodo(keyword))
        },
        saveNewTodo: (newTodo) => {
            dispatch(saveNewTodo(newTodo))
        },
        removeTodo: (id) => {
            dispatch(removeTodo(id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)