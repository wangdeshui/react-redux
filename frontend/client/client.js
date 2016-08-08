import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory,IndexRoute } from 'react-router'
import Home from '../components/Home'
import Todos from '../components/Todos'
import App from '../components/App'

render(

    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home}/>
            <Route path="todos" component={Todos}/>
        </Route>
    </Router>,


    document.getElementById('app')
)