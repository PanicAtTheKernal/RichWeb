import React, {useState, useRef, useEffect } from 'react';
import Note, { NoteProps } from './Note/Note';
import { Subject, filter } from 'rxjs';

export type NoteValues = {
    key: string,
    text: string,
    colour: string,
    noteSubject: Subject<NoteRequest>
}

export enum NoteRequestType {
    Delete,
    Edit
}

export type NoteRequest = {
    type: NoteRequestType,
    key: string
}

type NoteAreaProps = {
    newItemObservable: Subject<NoteProps>
} 

function NoteArea(props: NoteAreaProps) {
    const noteSubject = useRef(new Subject<NoteRequest>())
    const [notes, setNotes] = useState<Array<NoteValues>>([
        {key: crypto.randomUUID(), text: "Hello world!", colour: "red", noteSubject: noteSubject.current},
        {key: crypto.randomUUID(), text: "Test note", colour: "blue", noteSubject: noteSubject.current} 
    ])

    // Function to handle delete note requests
    noteSubject.current.pipe(
        filter((request: NoteRequest) => request.type === NoteRequestType.Delete)
    ).subscribe((request: NoteRequest) => {
        setNotes((currentNotes) => {
            // Remove the note that mentioned in the id
            return currentNotes.filter(note => note.key !== request.key)
        })
    })

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
                return <Note id={note.key} text={note.text} colour={note.colour} noteAreaSubject={noteSubject.current} key={note.key}></Note>
            })}
        </div>
    );
}

export default NoteArea;
