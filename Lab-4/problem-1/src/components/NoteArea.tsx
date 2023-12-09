import React, {useState, useRef } from 'react';
import Note, { NoteProps } from './Note/Note';
import { Subject } from 'rxjs';

type NoteAreaProps = {
    newItemObservable: Subject<NoteProps>
} 

const testNote: NoteProps = {text: "", colour: ""} 

function NoteArea(props: NoteAreaProps) {
    const [notes, setNotes] = useState<Array<NoteProps>>([
        {text: "Hello world!", colour: "red"},
        {text: "Test note", colour: "blue"} 
    ])
    const newNoteSubscriber = useRef(props.newItemObservable.subscribe({
        next (newNote: NoteProps) {
            setNotes((currentNotes) => {
                return {
                    ...currentNotes,
                    newNote
                }
            })
        }
    }))

    return (
        <div className="NoteArea" id="noteArea">
            {notes.map((note) => {
                return <Note text={note.text} colour={note.colour}></Note>
            })}
        </div>
    );
}

export default NoteArea;
