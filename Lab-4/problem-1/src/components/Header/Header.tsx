import React, {useState, useRef, useEffect } from 'react';
import "./Header.css";
import { Subject } from 'rxjs';
import { OpenFormRequest } from '../NewNoteForm/NewNoteForm';
import { types } from '../../colours';

export type HeaderProps = {
    openFormSubject: Subject<OpenFormRequest>
    filterSubject: Subject<string>
}

function Header(props: HeaderProps) {
    return (
        <div className="Header" id="header">
            <h1 id="heading">Simple React Notes 📒</h1>
            <label htmlFor="typeFilter" className='center'><h2>Filter type:</h2></label>
            <select name="typeFilter"  id="typeFilter" onChange={(value) => { props.filterSubject.next(value.target.value)}}>
                <option value="none">none</option>
                {types.map((type) => {
                    return <option value={type}>{type}</option>
                })}
            </select>
            <button id="addButton" className='AddButton active' onClick={() => {props.openFormSubject.next({open: true, request: null})}}>
                <h1>+</h1>
            </button>
        </div>
    );  
}

export default Header;
