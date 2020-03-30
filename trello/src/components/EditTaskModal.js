import React from 'react';
import Modal from 'react-modal';
import ErrorDialog from './ErrorDialog'

export default class EditTaskModal extends React.Component{

    handleSaveChanges = (e) =>{    
        e.preventDefault();
        const taskName = e.target.elements.taskName.value.trim();
        const taskDescription = e.target.elements.taskDescription.value.trim();
        const newTask = {
            name: taskName,
            description: taskDescription
        }
        const oldTask = {
            name: this.props.taskName,
            description: this.props.taskDescription
        }   
        this.props.handleEditTask(oldTask, newTask);
    }

    render(){
        return (
            <Modal
                onClick={null}
                isOpen={!!this.props.showModal}
                ariaHideApp={false}
                contentLabel="Edit task"
                onRequestClose={this.props.closeModal}
                closeTimeoutMS={200}
                className="modal">
                <div onClick={function f(e){e.stopPropagation()}}>    
                    <h3 className="modal__title">Edit task</h3>
                    <form onSubmit={this.handleSaveChanges}>
                        <input  className="modal__taskname" 
                            type="text" name="taskName" defaultValue={this.props.taskName}/>
                        <textarea  className="modal__taskdescription" 
                                name="taskDescription" defaultValue={this.props.taskDescription}/>
                        <div className="modal__buttons">
                            <button className="modal__button-cancel modal__button-save">Save</button>
                        </div>
                    </form>
                    <button className="modal__button-cancel" onClick={this.props.closeModal}>Cancel</button>
                    {
                        this.props.error && 
                        <div className="modal_errordialog">
                            <ErrorDialog error={this.props.error}/>
                        </div>}
                </div>
            </Modal>
        )
    }
};

