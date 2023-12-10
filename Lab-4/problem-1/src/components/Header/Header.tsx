import React, {useState, useRef, useEffect } from 'react';
import "./Header.css";
import { Subject } from 'rxjs';
import { OpenFormRequest } from '../NewNoteForm/NewNoteForm';

export type HeaderProps = {
    openFormSubject: Subject<OpenFormRequest>
}

function Header(props: HeaderProps) {
    return (
        <div className="Header" id="header">
            <h1 id="heading">Simple React Notes 📒</h1>
            <button id="addButton" className='AddButton active' onClick={() => {props.openFormSubject.next({open: true, request: null})}}>
                <h1>+</h1>
            </button>
        </div>
    );  
}

export default Header;
