import React from 'react';
import ErrorDialog from './ErrorDialog'

export default class AddTaskType extends React.Component {
    state = {
        showForm: false,
        buttonLabel: 'Add task type',
        error: undefined
    }

    handleEnableAddTaskType = (e) => {
        e.preventDefault();
        const buttonLabel = this.state.buttonLabel == 'Add task type' ? 'Cancel' : 'Add task type';
        this.setState((prevState) => {
            return {
                showForm: !prevState.showForm,
                buttonLabel: buttonLabel,
                error: undefined
            };
        });
    };

    handleAddTaskType = (e) =>{
        e.preventDefault();

        const taskName = e.target.elements.taskType.value.trim();
        const taskType = {name:taskName, items:[]};
        const error = this.props.handleAddTaskType(taskType);
        let buttonLabel = 'Cancel';
        let showForm = true;
    
        if (!error){
            e.target.elements.taskType.value = '';
            showForm = false;
            buttonLabel = 'Add task type';
        }

        this.setState(() => {
            return {
                showForm: showForm,
                buttonLabel: buttonLabel,
                error
            };
        });
      
    }

    render (){
        return (
            <div className="add-task-type">
                <div className="add-task-type__formanderror">
                    <form className="add-task-type__form" >
                        <button className="button" onClick={this.handleEnableAddTaskType}><span>{this.state.buttonLabel}</span></button>
                    </form>
                      {(this.state.error && this.state.buttonLabel == 'Cancel') &&
                        <div className="error-dialog-add-pipeline">
                            <ErrorDialog error={this.state.error}/>
                        </div>}
                </div>
                <div className="add-task-type__formcontainer">
                    {this.state.showForm && <div>
                        <form className="add-option" onSubmit={this.handleAddTaskType}>
                            <input  className="add-option__input" type="text" name="taskType"/>
                            <button className="button" ><span>Add</span></button>
                        </form>
                    </div>}
                </div>
            </div>
        )
    }
}

