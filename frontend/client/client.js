import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import Home from '../components/Home'
import Todos from '../containers/Todos'
import App from '../containers/App'
import {Provider} from 'react-redux'
import configureStore from '../redux/store'

let store = configureStore()
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home}/>
                <Route path="todos" component={Todos}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)