import React from 'react';
import Task from './Task';
import ErrorDialog from './ErrorDialog'

export default class Tasks extends React.Component{
    state = {
        enableAddTask: false,
        addButtonLabel: 'Add new task',
        tasksInfo: [],
        error: undefined
    }

    checkIfValueExists = (name) => {
        return this.state.tasksInfo.some(function(x) {
          return x.name === name;
        }); 
      }

    handleEnableAddTask = (e) =>{
        e.preventDefault();
        const addButtonLabel = this.state.addButtonLabel == 'Add new task' ? 'Cancel' : 'Add new task';
        this.setState((prevState) => {
            return {
                enableAddTask: !prevState.enableAddTask,
                addButtonLabel,
                error: undefined
            };
        });

    }

    handleAddTask = (e) =>{
        e.preventDefault();
        const taskName = e.target.elements.taskName.value.trim();
        const taskDescription = e.target.elements.taskDescription.value.trim();
        let error;
        let addButtonLabel = 'Cancel';

        if(!taskName) {
            error = 'Enter valid value';
        } else if (this.checkIfValueExists(taskName)) {
            error = 'This type of task already exists';
        }
        if (error){
            this.setState((prevState) => {
                return {
                    error: error
                };
            });
            return
        }
        addButtonLabel = 'Add new task';
        let task = {
            name: taskName,
            description: taskDescription
        }

        //Update the localStorage
        let localStorageStr = localStorage.getItem("tasksType");
        let localStorageJSON = JSON.parse(localStorageStr);
        localStorageJSON.forEach((column) => {
            if(column.name === this.props.optionText){
                column.items=column.items.concat(task);
            }
        });
        localStorage.setItem("tasksType",JSON.stringify(localStorageJSON));

        this.setState((prevState) => {
            return {
                tasksInfo: prevState.tasksInfo.concat([task]),
                enableAddTask: !prevState.enableAddTask,
                addButtonLabel: addButtonLabel,
            }
        })
    }

    handleUpdateTask = (oldTask, newTask) => {
        if(!newTask.name) {
            return 'Enter valid value';
        }

        if (oldTask.name !== newTask.name || oldTask.description !== newTask.description){
            let currentTasks = this.state.tasksInfo;
            currentTasks.forEach((task) => {
                if (task.name === oldTask.name){
                    task.name = newTask.name;
                    task.description = newTask.description;
                    return;
                }
            })
            this.setState(() => {
                return {
                    tasksInfo: currentTasks
                }
            })

        } 

        //Update the localStorage
        const json = JSON.stringify(this.state.tasksInfo);
        localStorage.setItem("tasks",json);
        let localStorageStr = localStorage.getItem("tasksType");
        let localStorageJSON = JSON.parse(localStorageStr);
        localStorageJSON.forEach((column) => {
            if(column.name === this.props.optionText){
                column.items=this.state.tasksInfo;
            }
        });
        localStorage.setItem("tasksType",JSON.stringify(localStorageJSON));

    };

    componentDidMount(){
        try {

            let localStorageStr = localStorage.getItem("tasksType");
            let localStorageJSON = JSON.parse(localStorageStr);
            
            localStorageJSON.forEach((column) => {
                if(column.name === this.props.optionText){
                    this.setState(() => ({ tasksInfo: column.items }));                 
                }
            });

        } catch (error) {
            
        }
        
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.tasksInfo.length !== this.state.tasksInfo.length){
            const json = JSON.stringify(this.state.tasksInfo);
            localStorage.setItem("tasks",json);
        }
    }


    render(props){
        return (
            <div>
                <div className="tasks__title__and__cross">
                    <p className="tasks__title">{this.props.optionText}</p>

                    <div className="close-container" onClick={(e) => {
                        this.props.handleDeleteTaskType(this.props.optionText)
                                }}>
                        <div className="leftright"></div>
                        <div className="rightleft"></div>
                    </div>
                </div>
                <div className="tasks">
                    
                    {
                        this.state.tasksInfo.map((task) => 
                            <Task key={task.name + task.description} name={task.name} description={task.description}
                            handleUpdateTask={this.handleUpdateTask}/>
                        )
                    }
                     
                     {this.state.enableAddTask && <div>
                            <div className="tasks-add_button_and_form">
                                <form onSubmit={this.handleAddTask}>
                                    <input  className="tasks-add-name_input" 
                                        type="text" name="taskName" placeholder="Enter a title"/>
                                    <textarea  className="tasks-add-description_input" 
                                            name="taskDescription" placeholder="Enter a description"/>
                                    <button className="tasks-add__button-confirm" ><span>Add</span></button>
                                </form>
                            </div>
                        </div>}
                </div>
                <div className="tasks-add__buton-div ">
                    <form onSubmit={this.handleEnableAddTask} >
                        <button className="tasks-add__button down" ><span>{this.state.addButtonLabel}</span></button>
                    </form>
                </div>
                {
                (this.state.error && this.state.addButtonLabel == 'Cancel') && 
                 <div className="add-task_errordialog">
                    <ErrorDialog error={this.state.error}/>
                 </div>}
            </div> 
        )
    }
}


