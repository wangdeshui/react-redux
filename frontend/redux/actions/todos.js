import createAction from './createAction'
import fetch from 'isomorphic-fetch'
import api from '../../common/api'

export const requestTodos = createAction('Request_Todos')
export const receiveTodos = createAction('Receive_Todos', todos => {
    return { todos }
})

export const showAddTodoModal = createAction('Show_Add_Todo_Modal')
export const hideAddTodoModal = createAction('Hide_Add_Todo_Modal')
export const saveNewTodo = createAction('Save_New_Todo', newTodo => { newTodo })

export const changeTodoStatusBegan = createAction('Change_Todo_Status_Began', todo => ({ todo }))
export const changeTodoStatusEnd = createAction('Change_Todo_Status_End', todo => ({ todo }))

export const addTodoBegan = createAction('Add_Todo_Began', id => ({ id }))
export const addTodoEnd = createAction('Add_Todo_End', newTodo => ({ newTodo }))

export const removeTodoBegan = createAction('Remove_Todo_Began')
export const removeTodoEnd = createAction('Remove_Todo_End', id => ({ id }))
export const searchTodos = createAction('Search_Todos', filter => ({ filter }))
export const changeTodoCompletedStatus = createAction('Change_Todo_Completed_Status', id => id)

export function changeTodoStatus(todo) {
    return dispatch => {
        let command = Object.assign({}, todo, { isCompleted: !todo.isCompleted })

        dispatch(changeTodoStatusBegan(todo))
        return api.put('todos', command)
            .then(todos => dispatch(changeTodoStatusEnd(todo)))
    }
}

export function fetchTodos() {
    return dispatch => {

        dispatch(requestTodos())
        return api.get('todos')
            .then(todos => dispatch(receiveTodos(todos)))
    }
}

export function removeTodo(todo) {
    return dispatch => {
        dispatch(removeTodoBegan(todo.id))
        return api.delete('todos', { params: { id: todo.id } })
            .then(todos => dispatch(removeTodoEnd(todo.id)))
    }
}

export function addTodo(newTodo) {
    return dispatch => {
        dispatch(addTodoBegan())
        return api.post('todos', newTodo)
            .then(todos => dispatch(addTodoEnd(newTodo)))
    }
}