import _ from 'lodash'
import {fetchTodo, requestTodos, receiveTodos,
     todoAdded, todoRemoved, searchTodo, showAddTodoModal, hideAddTodoModal} from '../actions'

let todoList = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case requestTodos.type:
            return Object.assign({}, state, { isLoading: true })
            
        case receiveTodos.type:
            return Object.assign({}, state, {
                todos: action.todos,
                resultTodos: Object.assign([], action.todos),
                isLoading: false
            })

        case todoAdded.type:
            return Object.assign({}, state, {
                todos: [...state.todos, action.todo],
                resultTodos: [...state.resultTodos, action.todo]
            })
        case todoRemoved.type:
            return Object.assign({}, state, {
                todos: state.todos.filter(todo => todo.id !== action.id),
                resultTodos: state.resultTodos.filter(todo => todo.id !== action.id)
            })

        case searchTodo.type:
            let resultTodos = _.filter(state.todos, todo => {
                if (todo.name.toLowerCase().indexOf(keyword) === -1) return false

                switch (status) {
                    case 'All': return true
                    case 'Completed': return todo.isCompleted
                    case 'UnCompleted': return !todo.isCompleted

                    default:
                        return true
                }
            })
            return Object.assign({}, state, { resultTodos: resultTodos })

        case showAddTodoModal.type:
            return Object.assign({}, state, { isShowingAddTodoModal: true })
        case hideAddTodoModal.type:
            return Object.assign({}, state, { isShowingAddTodoModal: false })
        default:
            return state
    }
}

export default todoList