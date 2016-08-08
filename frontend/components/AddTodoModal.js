import React from 'react'

export default class AddTodoModal extends React.Component {
    constructor(props) {
        super(props)
    }

    show() {
        $(this.refs.modal).modal('show')
    }

    render() {
        let {saveNewTodo} = this.props

        let save = () => {
            saveNewTodo(this.refs.newTodoName.value)
            $(this.refs.newTodoName).val("")
            $(this.refs.modal).modal('hide')
        }

        return (
            <div id="addTodoModal" className="modal fade" tabIndex="-1" role="dialog" ref='modal'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times; </span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <input className='form-control' ref='newTodoName'/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                onClick={save}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 