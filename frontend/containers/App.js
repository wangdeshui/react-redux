import 'babel-polyfill';
import React, { Component } from 'react'
import Header from  "../components/Header"


class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="container"  id="main" >
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App
