import React from 'react';
import "./Header.css";

function Header() {


    return (
        <div className="Header" id="header">
            <h1 id="heading">Simple React Notes 📒</h1>
            <button id="addButton" className='AddButton active'><h1>+</h1></button>
        </div>
    );  
}

export default Header;
