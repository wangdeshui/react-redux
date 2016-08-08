import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'

import Home from './Home'
import TodoListContainer from './TodosContainer'
import App from './App'
import todoListReducer from '../reducers'

let store = createStore(todoListReducer, applyMiddleware(thunkMiddleware))
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home}/>
                <Route path="todos" component={TodoListContainer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)