import Header from './Header'
import React from 'react';
import TaskType from './TaskType';
import AddTaskType from './AddTaskType'

export default class TrelloApp extends React.Component {
    state = {
        tasksType: [
         {'name':'New', 'items':[]},
         {'name':'In Progress', 'items':[]},
         {'name':'Ready for QA', 'items':[]}
        ]
       }

    checkIfValueExists = (name) => {
        return this.state.tasksType.some(function(x) {
          return x.name === name;
        }); 
      }

    handleAddTaskType = (taskType) => {

        if(!taskType.name) {
            return 'Enter valid value';
        } else if (this.checkIfValueExists(taskType.name)) {
            return 'This type of task already exists';
        }

        this.setState((prevState) => {
            return {
                tasksType: prevState.tasksType.concat([taskType])
            }
        })
    };

    handleDeleteTaskType = (taskToremove) => {
        const items = this.state.tasksType.filter(item => item.name !== taskToremove);
        this.setState({ tasksType: items });
    };

    componentDidMount(){
        try {
            const json = localStorage.getItem("tasksType");
            const tasksType = JSON.parse(json);
            if(json){
                this.setState(() => ({ tasksType })); 
            }else{
                localStorage.setItem("tasksType",JSON.stringify(this.state.tasksType)); 

            }
        } catch (error) {
            
        }
        
    }

    componentDidUpdate(prevState){
        if (prevState.tasksType.length !== this.state.tasksType.length){
            const json = JSON.stringify(this.state.tasksType);
            localStorage.setItem("tasksType",json);
        }
    }

    render () {
        return (
            <div>
                <Header />
                <AddTaskType handleAddTaskType={this.handleAddTaskType} handleAddTaskType={this.handleAddTaskType} />
                <div className="container" >
                    <TaskType taskType={this.state.tasksType} handleDeleteTaskType={this.handleDeleteTaskType} />
                </div>
            </div>
        )
    }
}