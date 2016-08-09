import React from 'react'

export default class Searchbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {searchTodos, onFilterChange} = this.props
        let search = (keyword, status) => {
            searchTodos({ keyword, status })
        }
        return (
            <div className='row'>
                <div className='col-sm-7'>
                    <input className='form-control' ref='searchKeyword'/>
                </div>

                <div className='col-sm-3'>
                    <select className='form-control' onChange={() => search(this.refs.searchKeyword.value, this.refs.searchStatus.value) } ref='searchStatus'>
                        <option value='All'>All</option>
                        <option value='Completed'>Completed</option>
                        <option value='UnCompleted'>UnCompleted</option>
                    </select>
                </div>

                <div className='col-sm-2'>
                    <button className='btn btn-primary'
                        onClick={() => search(this.refs.searchKeyword.value, this.refs.searchStatus.value) }>
                        Search
                    </button>
                </div>
            </div>
        )
    }
} 