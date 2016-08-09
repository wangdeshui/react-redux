import React from 'react'
import classNames from 'classNames'

export default class AddTodoModal extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.bindEvent()
    }

    get isOpened() {
        return ($(this.refs.modal).data('bs.modal') || {}).isShown
    }

    show() {
        if (!this.isOpened) {
            $(this.refs.modal).modal('show')
            setTimeout(() => this.refs.newTodoName.focus(), 500);
        }
    }

    hide() {
        if (this.isOpened) {
            $(this.refs.modal).modal('hide')
            $(this.refs.newTodoName).val("")
        }
    }

    bindEvent() {
        if (this.refs.modal) {
            $(this.refs.modal).on("hidden.bs.modal", this.props.hideAddTodoModal)
        }
    }

    render() {
        let {addTodo, isShowing, hideAddTodoModal, isAddingTodo, todos} = this.props

        let saveButtonClassNames = classNames({
            'btn btn-primary': true,
            'disabled': isAddingTodo
        })

        if (isShowing) {
            this.show()
        } else {
            this.hide()
        }

        let save = () => {
            let id = todos.length > 0 ? _.maxBy(todos, todo => todo.id).id + 1 : 1
            addTodo({
                id: id,
                name: this.refs.newTodoName.value,
                isCompleted: false
            })
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
                            <button type="button" className="btn btn-default" onClick={hideAddTodoModal}>Close</button>
                            <button type="button" className={saveButtonClassNames}
                                onClick={save}>
                                {
                                    isAddingTodo ? <span>Saving</span> :
                                        <span>Save</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 