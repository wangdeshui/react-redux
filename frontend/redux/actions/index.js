import createAction from './createAction'
import fetch from 'isomorphic-fetch'
import api from '../../common/api'

export const requestTodos = createAction('Request_Todos')
export const receiveTodos = createAction('Receive_Todos', todos => {
  return { todos }
})

export const showAddTodoModal = createAction('Show_Add_Todo_Modal')
export const hideAddTodoModal = createAction('Hide_Add_Todo_Modal')
export const saveNewTodo = createAction('Save_New_Todo', newTodo => newTodo)
export const todoAdded = createAction('Todo_Added', newTodo => newTodo)
export const removeTodo = createAction('Remove_Todo', id => id)
export const todoRemoved = createAction('Todo_Removed')
export const searchTodo = createAction('Search_Todo')
export const changeTodoCompletedStatus = createAction('Change_Todo_Completed_Status', id => id)

export function fetchTodos() {
  return dispatch => {

    dispatch(requestTodos())
    return api.get('todos')
      .then(todos => dispatch(receiveTodos(todos)))
  }
}