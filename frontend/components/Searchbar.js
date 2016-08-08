import React from 'react'

export default class Searchbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {searchTodo, onFilterChange} = this.props

        return (
            <div className='row'>
                <div className='col-sm-7'>
                    <input className='form-control' ref='searchKeyword'/>
                </div>

                <div className='col-sm-3'>
                    <select className='form-control' onChange={() => searchTodo(this.refs.searchKeyword.value, this.refs.searchStatus.value)} ref='searchStatus'>
                        <option value='All'>All</option>
                        <option value='Completed'>Completed</option>
                        <option value='UnCompleted'>UnCompleted</option>
                    </select>
                </div>

                <div className='col-sm-2'>
                    <button className='btn btn-primary'
                        onClick={() => searchTodo(this.refs.searchKeyword.value, this.refs.searchStatus.value)}>
                        Search
                    </button>
                </div>
            </div>
        )
    }
} 