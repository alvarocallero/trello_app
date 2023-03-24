import React from 'react';

const ErrorDialog = (props) => {
    return (
        <div>
            <div className="error-dialog__text">{props.error}</div>
        </div>
    )
};

export default ErrorDialog;