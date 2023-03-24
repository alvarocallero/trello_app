import React from 'react';
import Tasks from './Tasks'

export default class TaskType extends React.Component {
        render (){
            return (
                <div className="tasktype">
                    {
                        this.props.taskType.map((type) => 
                        <Tasks 
                            key={type.name} 
                            optionText={type.name} 
                            handleDeleteTaskType={this.props.handleDeleteTaskType}
                        />)
                    }
                </div>
            )
        }
}

