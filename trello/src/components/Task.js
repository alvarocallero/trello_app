import React from 'react';
import EditTaskModal from './EditTaskModal';

export default class Task extends React.Component{
    state = {
        showEditModal: false,
        modalError: undefined
    }

    closeModal = () =>{
        this.setState((prevState) => {
            return {
                showEditModal: !prevState.showEditModal
            };
        });
    }

    handleDivClick = () => {
        var senderElementName = event.target.tagName.toLowerCase();
        if(senderElementName !== 'div') {
            this.setState((prevState) => {
                return {
                    showEditModal: !prevState.showEditModal
                };
            });        
        } 
    };

    handleEditTask = (oldTask, newTask) => {
        const error = this.props.handleUpdateTask(oldTask, newTask);
        this.setState(() => {
            return {
                modalError: error
            };
        }); 
 
    }

    render(){
        return (
            <div className="task" onClick={this.handleDivClick}>
                <p className="task__title">{this.props.name}</p>
                <p className="task__description">{this.props.description}</p>
                <EditTaskModal showModal={this.state.showEditModal} closeModal={this.closeModal}
                    taskName={this.props.name} taskDescription={this.props.description}
                    saveChanges={this.handleSubmitChanges} handleEditTask={this.handleEditTask}
                    error={this.state.modalError}/>
            </div>
            
            
        )
    }
}

