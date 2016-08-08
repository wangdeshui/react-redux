import React, { Component } from 'react'
import TodoLists from '../components/TodoLists'
import {fetchTodos} from '../redux/actions'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos,
        resultTodos: state.todos.resultTodos,
        isLoading: state.todos.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => {
            dispatch(fetchTodos())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists)