import _ from 'lodash'
import {fetchTodo, requestTodos, receiveTodos,
    addTodoBegan, addTodoEnd, removeTodoBegan, removeTodoEnd,
    searchTodos, showAddTodoModal, hideAddTodoModal,
    changeTodoStatusBegan,
    changeTodoStatusEnd} from '../actions'

let todo = (todo, action) => {
    switch (action.type) {
        case removeTodoBegan.type:
            if (todo.id !== action.id) return todo
            return Object.assign({}, todo, { isRemoving: true })
        case changeTodoStatusBegan.type:
            if (todo.id !== action.todo.id) return todo
            return Object.assign({}, todo, { isChangingStatus: true })
        case changeTodoStatusEnd.type:
            if (todo.id !== action.todo.id) return todo
            return Object.assign({}, todo, {
                isChangingStatus: false,
                isCompleted: !action.todo.isCompleted
            })
        default:
            break;
    }
}

let todoList = (state = { isLoading: true }, action) => {
    switch (action.type) {
        case requestTodos.type:
            return Object.assign({}, state, { isLoading: true })

        case receiveTodos.type:
            return Object.assign({}, state, {
                items: action.todos,
                resultTodos: Object.assign([], action.todos),
                isLoading: false
            })

        case addTodoBegan.type:
            return Object.assign({}, state, {
                isAddingTodo: true
            })
        case addTodoEnd.type:
            return Object.assign({}, state, {
                isAddingTodo: false,
                isShowingAddTodoModal: false,
                items: [...state.items, action.newTodo],
                resultTodos: [...state.resultTodos, action.newTodo]
            })

        case removeTodoBegan.type:
            return Object.assign({}, state, {
                items: state.items.map(t => todo(t, action)),
                resultTodos: state.resultTodos.map(t => todo(t, action))
            })
        case removeTodoEnd.type:
            return Object.assign({}, state, {
                items: state.items.filter(todo => todo.id !== action.id),
                resultTodos: state.resultTodos.filter(todo => todo.id !== action.id)
            })

        case searchTodos.type:
            let resultTodos = _.filter(state.items, todo => {
                if (todo.name.toLowerCase().indexOf(action.filter.keyword) === -1) return false

                switch (action.filter.status) {
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

        case changeTodoStatusBegan.type:
            return Object.assign({}, state, {
                items: state.items.map(t => todo(t, action)),
                resultTodos: state.resultTodos.map(t => todo(t, action))
            })

        case changeTodoStatusEnd.type:
            return Object.assign({}, state, {
                items: state.items.map(t => todo(t, action)),
                resultTodos: state.resultTodos.map(t => todo(t, action))
            })


        default:
            return state
    }
}

export default todoList