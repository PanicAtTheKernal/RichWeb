import React from 'react';
import Note from './Note';
import { Subject } from 'rxjs';

type NoteAreaProps = {
    newItemObservable: Subject<React.JSX.Element>
} 

function NoteArea(props: NoteAreaProps) {


    return (
        <div className="NoteArea" id="noteArea">
            <Note text='Hello world' colour="red"></Note>
            <Note text='Test' colour="blue"></Note>
        </div>
    );
}

export default NoteArea;
