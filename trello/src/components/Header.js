import React from 'react';

export default class Header extends React.Component {
    render(){
        return (
            <div className="header">
                <h5 suppressContentEditableWarning={true} contentEditable="true" className="header__title">Alvaro</h5>
                <img className="header__logo" src="https://kanbantool.com/assets/public_pages/product_tour/kanban-tool-on-site.png"></img>
            </div>
        )
    }
}